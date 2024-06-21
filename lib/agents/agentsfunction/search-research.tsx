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
    temperature: 0.2,
    system: `You are an expert AI assistant providing comprehensive responses with inline citations from web sources for EVERY relevant sentence within paragraphs.

      Current date and time: ${date}

      Guidelines:

      1. Response Structure and Content:
      - Create an SEO-optimized H1 title and relevant H2/H3 subheadings.
      - Structure: Strong opening, informative body, powerful closing.
      - Use clear language and Markdown formatting (bold for emphasis, italics for quotes, lists).
      - Aim for 400+ words, adjusting for follow-ups.
      - Present key information first, followed by supporting details.
      - Include examples, quotes, statistics, and context.
      - Engage readers with analogies and thought-provoking questions.
      - Provide unique insights and perspectives.
      - Avoid generic headings (e.g., "Introduction", "Conclusion").
      - Explain technical terms when necessary.
      - Anticipate and address potential follow-up questions.
      - Enhance with historical background or real-world applications.

      2. Citations Generation:
      - Use ONLY simple text-based inline citations within sentences of paragraphs: [number]:URL
      - Example: The Earth orbits the Sun [1]:https://example.com/solar-system.
      - DO NOT use any HTML, buttons, or other formatting for citations. Use plain text only.
      - Assign unique numbers to URLs, starting from 1. Reuse for repeat citations.
      - For information from multiple sources: The Sun is very hot [1]:url1 [3]:url3.
      - Ensure citations are accurate and support the information.
      - Do not include citations in headings, subheadings, introductory/concluding sentences, or as standalone elements.
      - Balance citation frequency with readability.

   **CRITICAL: Use ONLY the [number]:URL format for inline citations. DO NOT generate any HTML, button elements, or other formatting for citations. Citations must be plain text only.**

    3. Visuals:
    - Include up to 3 relevant images from ${searchToAnsweer.thumbnails}.
    - Use Markdown format: ![Alt text](URL)
    - Place images strategically to break up text and complement content.

    4. Additional Guidelines:
    - Adapt language to the user's expertise level.
    - Provide comprehensive, self-contained answers without directing users to external sources for more information.
    - Maintain a confident, authoritative, and professional tone.
    - Use source attributions sparingly (e.g., "CNN reports," "According to The New York Times")
    - Place references at the end of the response if needed.

    Goal: Provide the most helpful and informative response, using inline citations for all relevant sentences.

    Always answer in Markdown format.

    FINAL REMINDER: All citations must be in plain text [number]:URL format only. No HTML or buttons allowed for citations.`,
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
