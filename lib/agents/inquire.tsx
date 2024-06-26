import { Copilot } from '@/components/copilot'
import {
  createStreamableUI,
  createStreamableValue,
  StreamableValue
} from 'ai/rsc'
import { CoreMessage } from 'ai'
import { PartialInquiry, inquirySchema } from '@/lib/schema/inquiry'
import { fireworks70bLangchainModel } from '@/lib/utils'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'

// Define a type that includes both StreamableValue and StreamableValueWrapper
type StreamableValueOrWrapper<T> =
  | StreamableValue<T>
  | { value: StreamableValue<T> }

export async function inquire(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  selectedModel: string
) {
  if (selectedModel.includes('llama')) {
    selectedModel = 'gpt-4o'
  }
  const objectStream = createStreamableValue<PartialInquiry>({})

  // Create a wrapper component to handle the StreamableValue or StreamableValueWrapper
  const CopilotWrapper = ({
    inquiryStream
  }: {
    inquiryStream: StreamableValueOrWrapper<PartialInquiry>
  }) => {
    const streamToUse =
      'value' in inquiryStream ? inquiryStream.value : inquiryStream

    return <Copilot inquiry={streamToUse as unknown as PartialInquiry} />
  }

  // Update the UI with the StreamableValue
  uiStream.update(
    <CopilotWrapper
      inquiryStream={objectStream as StreamableValueOrWrapper<PartialInquiry>}
    />
  )

  let finalInquiry: PartialInquiry = {}
  const parser = StructuredOutputParser.fromZodSchema(inquirySchema)
  const appendedPrompt = `The user query is: {input}

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

  When crafting your inquiry, always structure it as follows:
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
  const filteredTasks = messages.filter(task => {
    return task.role === 'user' && task.content.includes('"input"' as any)
  })

  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromTemplate(appendedPrompt),
    fireworks70bLangchainModel(),
    parser
  ])
  try {
    await chain
      .stream({
        input: JSON.parse(filteredTasks[0].content as string).input,
        format_instructions: parser.getFormatInstructions()
      })
      .then(async result => {
        for await (const obj of result) {
          console.log(obj, 'obj')
          if (obj && typeof obj === 'object') {
            const partialInquiry: PartialInquiry = obj as PartialInquiry
            objectStream.update(partialInquiry)
            finalInquiry = partialInquiry
          }
        }
      })
      .catch(() => {
        const RecursiveInquire = inquire(uiStream, messages, selectedModel)
        return RecursiveInquire
      })
  } finally {
    objectStream.done()
  }

  return finalInquiry
}
