import { ChatFireworks } from '@langchain/community/chat_models/fireworks'
import { z } from 'zod'
import { RunnableSequence } from '@langchain/core/runnables'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import dotenv from 'dotenv'
dotenv.config()
const model = new ChatFireworks({
  model: 'accounts/fireworks/models/llama-v3-70b-instruct',
  apiKey: process.env.FIREWORKS_API_KEY,
  temperature: 0.1
})
;(async () => {
  const zodSchema = z.object({
    answer: z.string().describe("answer to the user's question"),
    source: z
      .string()
      .describe(
        "source used to answer the user's question, should be a website."
      )
  })

  const parser = StructuredOutputParser.fromZodSchema(zodSchema)

  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromTemplate(
      'Answer the users question as best as possible.\n{format_instructions}\n{question}'
    ),
    model,
    parser
  ])

  const response = await chain.invoke({
    question: 'What is the capital of France?',
    format_instructions: parser.getFormatInstructions()
  })

  console.log(response)
})()
