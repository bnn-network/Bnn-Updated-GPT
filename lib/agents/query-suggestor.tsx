import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamObject } from 'ai'
import { PartialRelated, relatedSchema } from '@/lib/schema/related'
import { Section } from '@/components/section'
import SearchRelated from '@/components/search-related'
import { fireworks70bLangchainModel, openAIInstance } from '../utils'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { ChatPromptTemplate } from '@langchain/core/prompts'

export const maxDuration = 60
export async function querySuggestor(
  uiStream: ReturnType<typeof createStreamableUI>,
  selectedModel: string,
  answer: string
) {
  const objectStream = createStreamableValue<PartialRelated>()
  uiStream.append(
    <Section title="Related" separator={true}>
      <SearchRelated relatedQueries={objectStream.value} />
    </Section>
  )

  let finalRelatedQueries: PartialRelated = {}
  const parser = StructuredOutputParser.fromZodSchema(relatedSchema)
  const appendedPrompt = `
        the assistant answer is {answer}
    As a professional web researcher, your task is to generate a set of three queries that explore the subject matter more deeply, building upon the initial query and the information uncovered in its search results.

    For instance, if the original query was "Starship's third test flight key milestones", your output should follow this format:
    {format_instructions}

    Aim to create queries that progressively delve into more specific aspects, implications, or adjacent topics related to the initial query. The goal is to anticipate the user's potential information needs and guide them towards a more comprehensive understanding of the subject matter.
    `
  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromTemplate(appendedPrompt),
    fireworks70bLangchainModel(),
    parser
  ])
  try {
    await chain
      .stream({
        answer:answer,
        format_instructions: parser.getFormatInstructions()
      })
      .then(async result => {
        for await (const obj of result) {
          if (obj.items) {
            objectStream.update(obj)
            finalRelatedQueries = obj
          }
        }
      })
      .catch(async error => {
        console.error('Error in querySuggestor:', error)
        const rescursiveResult: any = await querySuggestor(
          uiStream,
          selectedModel,
          answer
        )
        return rescursiveResult
      })
  } finally {
    objectStream.done()
  }

  return finalRelatedQueries
}
