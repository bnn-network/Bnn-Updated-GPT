import { OpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

export default async function ParamQueryGenerator(prompt: string) {
  const openai = new OpenAI({
    baseUrl: process.env.OPENAI_API_BASE,
    apiKey: process.env.OPENAI_API_KEY,
    organization: ''
  })
  const result = await generateText({
    model: openai.chat('gpt-4o'),
    messages: [
      {
        role: 'assistant',
        content:
          'You are helpful assistant , you help users to generate a meaningfull prompt for the paramater query sent by the user without asking any question if the prompt makes sense or not. The query generated should be based on the user input and if it does not make sense then give the prompt as the answer. Please do not ask any question to user , just generate the query based on the user input. example string : "What is happening in US right now? or "What is the weather in New York?'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    maxTokens: 1000,
    temperature: 0.1
  })
  return result.text
}
