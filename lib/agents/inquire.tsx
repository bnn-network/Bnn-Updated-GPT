import { Copilot } from '@/components/copilot'
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamObject } from 'ai'
import { PartialInquiry, inquirySchema } from '@/lib/schema/inquiry'
import { fireworks70bLangchainModel, openAIInstance } from '@/lib/utils'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'

export async function inquire(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  selectedModel: string
) {
  if (selectedModel.includes('llama')) {
    selectedModel = 'gpt-4o'
  }
  const objectStream = createStreamableValue<PartialInquiry>()
  uiStream.update(<Copilot inquiry={objectStream.value} />)
  let finalInquiry: PartialInquiry = {}
  const parser = StructuredOutputParser.fromZodSchema(inquirySchema)
  const appendedPrompt = `
      the user query is {input}
  As a professional web researcher, your role is to deepen your understanding of the user's input by conducting further inquiries when necessary.
    After receiving an initial response from the user, carefully assess whether additional questions are absolutely essential to provide a comprehensive and accurate answer. Only proceed with further inquiries if the available information is insufficient or ambiguous.

    When crafting your inquiry, structure it as follows:
    {format_instructions}

    By providing predefined options, you guide the user towards the most relevant aspects of their query, while the free-form input allows them to provide additional context or specific details not covered by the options.
    Remember, your goal is to gather the necessary information to deliver a thorough and accurate response.
    Please match the language of the response to the user's language.
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
          if (obj) {
            objectStream.update(obj)
            finalInquiry = obj
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
