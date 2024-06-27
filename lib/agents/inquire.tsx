import { Copilot } from '@/components/copilot'
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage } from 'ai'
import { PartialInquiry, inquirySchema } from '@/lib/schema/inquiry'
import { fireworks70bLangchainModel } from '@/lib/utils'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'

// Define the correct type for what createStreamableValue returns
type StreamableValueWrapper<T> = {
  update: (value: T) => void
  done: () => void
  value: T
}

// This component bridges the gap between StreamableValueWrapper and Copilot
const StreamableCopilot = ({
  inquiryStream
}: {
  inquiryStream: StreamableValueWrapper<PartialInquiry>
}) => {
  return <Copilot inquiry={inquiryStream.value} />
}

const appendedPrompt = `
  The user query is: {input}

  As a professional web researcher, your role is to deepen your understanding of the user's input by conducting further inquiries when necessary. Your primary goal is to gather sufficient information to provide a comprehensive and accurate answer.

  Instructions:
  1. Analyze the user's query carefully.
  2. If the query is vague, brief, or lacks specificity:
     - Generate broad categories or themes related to the query.
     - Prepare clarifying questions to help narrow down the user's intent.
     - Consider potential interpretations or contexts for the query.
  3. If the query is detailed or specific:
     - Focus on aspects that still need clarification.
     - Identify any ambiguities or missing information.

  When crafting your inquiry, structure it as follows:
  {format_instructions}

  Guidelines for creating options:
  - Provide 3-5 predefined options that cover a range of possible intents or directions.
  - Ensure options are mutually exclusive when possible.
  - Include an "Other" option to catch any intents not covered.
  - Make options clear, concise, and relevant to the query.

  For the free-form input:
  - Craft a prompt that encourages the user to provide additional context or specific details.
  - Tailor this prompt to address any gaps in information identified from the initial query.

  Remember:
  - Your goal is to guide the user towards providing the most relevant and useful information for their query.
  - Adapt your language style to match the user's language and level of expertise.
  - If the initial query is extremely vague (e.g., single word or very short phrase), start with very broad categories or ask about the general topic area the user is interested in.

  Always provide a structured response, even for the vaguest queries. Do not leave any part of the structure empty or undefined.
`

export async function inquire(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  selectedModel: string,
  isSkipped: boolean = false
) {
  if (selectedModel.includes('llama')) {
    selectedModel = 'gpt-4o'
  }

  const inquiryStream = createStreamableValue<PartialInquiry>(
    {}
  ) as StreamableValueWrapper<PartialInquiry>
  let isStreamClosed = false

  const updateUI = () => {
    if (!isStreamClosed) {
      try {
        uiStream.update(<StreamableCopilot inquiryStream={inquiryStream} />)
      } catch (error) {
        console.error('Error updating UI:', error)
      }
    }
  }

  // Initial UI update
  updateUI()

  let finalInquiry: PartialInquiry = {}
  const parser = StructuredOutputParser.fromZodSchema(inquirySchema)

  const filteredTasks = messages.filter(task => {
    return task.role === 'user' && task.content.includes('"input"' as any)
  })

  const input = isSkipped
    ? `The user skipped the previous question. Please provide a more general inquiry based on the original input: ${
        JSON.parse(filteredTasks[0].content as string).input
      }`
    : JSON.parse(filteredTasks[0].content as string).input

  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromTemplate(appendedPrompt),
    fireworks70bLangchainModel(),
    parser
  ])

  try {
    await chain
      .stream({
        input,
        format_instructions: parser.getFormatInstructions()
      })
      .then(async result => {
        for await (const obj of result) {
          if (obj && typeof obj === 'object' && !isStreamClosed) {
            const partialInquiry: PartialInquiry = obj as PartialInquiry
            inquiryStream.update(partialInquiry)
            updateUI()
            finalInquiry = partialInquiry
          }
        }
      })
      .catch(error => {
        console.error('Error in chain execution:', error)
        const errorInquiry: PartialInquiry = {
          question:
            "I'm sorry, I'm having trouble understanding. Could you please rephrase your question?",
          options: [
            { value: 'rephrase', label: 'Rephrase my question' },
            { value: 'new_topic', label: 'Ask about a new topic' }
          ],
          allowsInput: true,
          inputLabel: 'Or type your response here'
        }
        inquiryStream.update(errorInquiry)
        updateUI()
      })
  } finally {
    if (!isStreamClosed) {
      isStreamClosed = true
      inquiryStream.done()
    }
  }

  return finalInquiry
}
