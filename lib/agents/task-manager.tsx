import { CoreMessage, generateObject } from 'ai'
import { nextActionSchema } from '../schema/next-action'
import { fireworks70bLangchainModel, openAIInstance } from '../utils'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { ChatPromptTemplate } from '@langchain/core/prompts'

export async function taskManager(
  messages: CoreMessage[],
  selectedModel: string
): Promise<any> {
  try {
    if (messages.length >= 3) {
      return { next: 'proceed' }
    }

    const parser = StructuredOutputParser.fromZodSchema(nextActionSchema)
    const appendedPrompt = `As an advanced AI web researcher, your goal is to understand the user's input, conduct thorough research, and provide a comprehensive, insightful response.

    Steps:
    1. Analyze the user's input:
       - Identify key concepts, entities, and themes
       - Determine the user's knowledge level and desired response depth
       - Consider the context and implications
       - see if there is something inappropriate or harrassing in the input and use the "proceed" option to report it.

    2. Determine the optimal action:
       - "proceed": If the information is sufficient or if there is something said which maybe harrassing or inappropriate to any individual or a group of individuals then you can  , you can you this option which will be further handled by our other AI agents.
       - "inquire": If additional information would enhance the response, present a form to gather details
       - Base your decision on the context and the potential for further information to improve the response quality and relevance
       - If the input indicates the user doesn't understand something, use "inquire" to ask what they need clarification on or want to know more about

    Your ultimate aim is to provide the most helpful, informative, and satisfying user experience by leveraging your web research expertise and information synthesis abilities.

    The user query is {input}
    The format instructions for the schema are {format_instructions}
    `
    const filteredTasks = messages.filter(task => {
      return task.role === 'user' && task.content.includes('"input"' as any)
    })

    const chain = RunnableSequence.from([
      ChatPromptTemplate.fromTemplate(appendedPrompt),
      fireworks70bLangchainModel(),
      parser
    ])
    const result = await chain.invoke({
      input: JSON.parse(filteredTasks[0].content as string).input,
      format_instructions: parser.getFormatInstructions()
    })

    return result
  } catch (error) {

    return { next: 'proceed' }
  }
}
