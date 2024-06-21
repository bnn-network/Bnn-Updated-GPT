import { BotMessage } from '@/components/message'
import { Section } from '@/components/section'
import { fireworks70bModel } from '@/lib/utils'
import { random } from '@/lib/utils/random'
import {
  CoreMessage,
  ToolCallPart,
  ToolResultPart,
  streamText as nonexperimental_streamText
} from 'ai'
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { search2Tool } from '../toolsfunction/searchfun'

type SearchResearch = {
  fullResponse: string
  toolResponses: ToolResultPart[]
  toolCalls: ToolCallPart[]
  messages: CoreMessage[]
  streamText: ReturnType<typeof createStreamableValue<string>>
  hasError: boolean
  uiStream: ReturnType<typeof createStreamableUI>
  query: string
}

export default async function SearchResearch({
  fullResponse,
  toolResponses,
  toolCalls,
  messages,
  streamText,
  uiStream,
  hasError,
  query
}: SearchResearch) {
  const answerSection = (
    <Section className="overflow-x-scroll lg:overflow-x-hidden" title="Answer">
      <BotMessage content={streamText.value} />
    </Section>
  )

  const rand = random()
  toolCalls.push({
    type: 'tool-call',
    toolName: 'search',
    args: { query: query },
    toolCallId: `call_${rand}`
  })
  const searchToAnsweer = await search2Tool(query, uiStream, fullResponse)

  toolResponses.push({
    type: 'tool-result',
    toolName: 'search',
    result: searchToAnsweer,
    toolCallId: `call_${rand}`
  })
  messages.push({ role: 'tool', content: toolResponses })
  if (!searchToAnsweer) {
    return { searchToAnsweer, fullResponse, hasError, toolResponses }
  }
  console.log(searchToAnsweer, 'searchToAnsweer')
  console.log(messages.length, 'messages.length')
  const date = new Date().toLocaleString()
  const searchStream = await nonexperimental_streamText({
    model: fireworks70bModel(),
    maxTokens: 4000,
    temperature: 0.4,
    system: `You are an expert AI assistant providing comprehensive responses with inline citations from web sources for EVERY relevant sentence.

      Current date and time: ${date}

      Guidelines:

      1. Response Structure and Content:
      - Create an SEO-optimized H1 title and relevant H2/H3 subheadings.
      - Structure: Strong opening, informative body, powerful closing.
      - Use clear language and Markdown formatting (bold, italics, lists).
      - Use italics only for quotes.
      - Aim for 400+ words initially; adjust for follow-ups.
      - Include examples, quotes, statistics, and context to support main points.
      - Engage readers with analogies, storytelling, and thought-provoking questions.
      - Provide unique insights and perspectives.

      2. Citations Generation:
      - Support your answer with the provided citations:
        ${searchToAnsweer.responses
          .map((res: any) => `- ${res.title} (${res.url})`)
          .join('\n')}
      - Use inline citations in the format [number]:URL at the end of relevant sentences or clauses. Example: The Earth orbits the Sun[1]:https://example.com/solar-system
      - Assign unique numbers to each URL, starting from 1. Reuse numbers for repeat citations.
      - Place citations immediately after relevant information, using multiple citations if needed within a sentence.
      - Aim for at least one citation per paragraph, except for general knowledge.
      - Ensure citations are accurate and directly support the presented information.
      - For direct quotes, place citations immediately after quotation marks.
      - Do not include citations in ANY headings, subheadings or purely introductory/concluding sentences.
      - Maintain a balance between sufficient citation and readability.

    **IMPORTANT: Use inline citations [number]:URL for all relevant information.**

    3. Visuals:
    - Include up to 3 relevant images from ${searchToAnsweer.thumbnails}.
    - Use Markdown format: ![Alt text](URL)
    - Place images strategically to break up text and complement content.

    4. Additional Guidelines:
    - Adapt language to user's expertise level.
    - Don't refer to ANY external sites for additional information, latest news, or more context.
    - Maintain a confident, authoritative tone.
    - Use source attributions like (e.g., "CNN reports," "According to The New York Times") sparingly to maintain an authoritative tone.
    - Place references at the end of the response if needed.

    Goal: Provide the most helpful and informative response, using inline citations for all relevant sentences.

      Always answer in Markdown format.`,
    messages
  }).catch(err => {
    hasError = true
    fullResponse = 'Error: ' + err.message
    streamText.update(fullResponse)
  })
  if (!searchStream) {
    return { searchStream, fullResponse, hasError, toolResponses }
  }

  for await (const delta of searchStream.fullStream) {
    if (delta.type === 'text-delta') {
      if (fullResponse.length === 0 && delta.textDelta.length > 0) {
        // Update the UI
        uiStream.append(answerSection)
      }

      fullResponse += delta.textDelta
      streamText.update(fullResponse)
    }
  }
  messages.push({
    role: 'assistant',
    content: [{ type: 'text', text: fullResponse }, ...toolCalls]
  })

  return { searchStream, fullResponse, hasError, toolResponses }
}
