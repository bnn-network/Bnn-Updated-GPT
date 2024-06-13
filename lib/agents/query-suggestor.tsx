import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamObject } from 'ai'
import { PartialRelated, relatedSchema } from '@/lib/schema/related'
import { Section } from '@/components/section'
import SearchRelated from '@/components/search-related'
import { openAIInstance } from '../utils'

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

  // console.log("messages: ", messages.map((m)=>{if(m.role === "assistant"){return m.content}}))

  // const onlyAssistantMessages = messages
  // .flatMap(m => {
  //   if (m.role === 'assistant') {
  //     if (Array.isArray(m.content)) {
  //       return m.content.map(c => c.text);
  //     } else {
  //       return [m.content];
  //     }
  //   }
  //   return [];
  // })
  // .join(' ');

  console.log('answer: ', answer)

  let finalRelatedQueries: PartialRelated = {}
  try {
    await streamObject({
      model: openAIInstance('gpt-3.5-turbo'),
      system: `As a professional web researcher, your task is to generate a set of three queries that explore the subject matter more deeply, building upon the initial query and the information uncovered in its search results.

    For instance, if the original query was "Starship's third test flight key milestones", your output should follow this format:

    "{
      "related": [
        "What were the primary objectives achieved during Starship's third test flight?",
        "What factors contributed to the ultimate outcome of Starship's third test flight?",
        "How will the results of the third test flight influence SpaceX's future development plans for Starship?"
      ]
    }"

    Aim to create queries that progressively delve into more specific aspects, implications, or adjacent topics related to the initial query. The goal is to anticipate the user's potential information needs and guide them towards a more comprehensive understanding of the subject matter.
    Please match the language of the response to the user's language.`,
      messages: [{role:'assistant', content: answer}],
      schema: relatedSchema
    })
      .then(async result => {
        for await (const obj of result.partialObjectStream) {
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
          'gpt-4o',
          answer
        )
        return rescursiveResult
      })
  } finally {
    objectStream.done()
  }

  return finalRelatedQueries
}
