import { z } from 'zod'
import { OpenAI } from '@langchain/openai'
import { RunnableSequence } from '@langchain/core/runnables'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { ChatPromptTemplate, HumanMessagePromptTemplate, PromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts'
import dotenv from 'dotenv'
import { CoreMessage } from 'ai'
dotenv.config()
;(async () => {
  const messages: CoreMessage[] = [
    {
      role: 'assistant',
      content: 'I can help you with that. What is your question?'
    },
    {
      role: 'user',
      content: 'What is the capital of France?'
    }
  ] 
  const promptTemplate = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(systemTemplate),
    ...messages.map(message => {
      if (message.role === 'user') {
        return HumanMessagePromptTemplate.fromTemplate(message.content);
      } else {
        return SystemMessagePromptTemplate.fromTemplate(message.content);
      }
    })
  ]);
  // We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      answer: z.string().describe("answer to the user's question"),
      sources: z
        .array(z.string().url())
        .describe('sources used to answer the question, should be websites.')
    })
  )

  const chain = RunnableSequence.from([
    messages,
    new OpenAI({ temperature: 0 }),
    parser
  ])

  console.log(parser.getFormatInstructions())

  const response = await chain.invoke({
    question: 'What is the capital of France?',
    format_instructions: parser.getFormatInstructions()
  })

  console.log(response)
})()
