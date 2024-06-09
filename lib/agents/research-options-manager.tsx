import { CoreMessage, generateObject } from 'ai'
import { nextActionSchema } from '../schema/next-action'
import { openAIInstance } from '../utils'
import { nextResearchSchema } from '../schema/next-research'

// Decide whether inquiry is required for the user input
export async function researchOptionsManager(
  messages: CoreMessage[]
): Promise<any> {
  try {
    const res: any = await generateObject({
      model: openAIInstance('gpt-4o'),
      system: `As a professional web researcher, your goal is to gather the necessary information to address the user's query effectively. To accomplish this, you have the following options:

"retrieve": If the query has a specific URL that contains the information needed to answer the user's query, choose this option. You will need to provide the URL which is present in the user query.
"chat": If you have enough knowledge of this topic and do not need to search web to answer the user's query , choose this option. You can provide a detailed response to the user's query without conducting a web search or retrieving information from a specific URL. This option is suitable when you already possess the relevant information or expertise to address the user's query effectively
"search": If you do not have enough information to answer the user's query and need to search the web for relevant information, choose this option. You will need to provide the query which is a string to search for information in the web. This option is suitable when you do not have information about latest trends or updates on the topic and need to search the web to provide the user with accurate and up-to-date information.

Choose the appropriate action based on your assessment of the user's query and the information you currently have. Your selection will determine the next steps you need to take to gather the necessary information and provide a comprehensive response to the user.
  `,
      messages,
      schema: nextResearchSchema
    })

    return res
  } catch (error) {
    const recursiveResult: any = await researchOptionsManager(messages)
    return recursiveResult
  }
}
