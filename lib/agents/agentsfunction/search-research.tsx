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
    - Use clear language and concise sentences.
    - Utilize Markdown formatting:
      * Bold for emphasis
      * Italics for quotes
      * Lists (bulleted or numbered) when presenting multiple points or steps
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
    - Use ONLY simple text-based inline citations at the end of sentences within regular paragraphs: [number]:URL
    - Example: The Earth orbits the Sun. [1]:https://example.com/solar-system
    - DO NOT use any HTML, buttons, or other formatting for citations. Use plain text only.
    - Assign unique numbers to URLs, starting from 1. Reuse for repeat citations.
    - For information from multiple sources: The Sun is very hot. [1]:url1 [3]:url3
    - Ensure citations are accurate and support the information.
    - Do not include citations in headings, subheadings, introductory/concluding sentences, or as standalone elements.
    - Balance citation frequency with readability.

    **CRITICAL: Use ONLY the [number]:URL format for inline citations at the end of sentences in regular paragraphs. DO NOT generate any HTML, button elements, or other formatting for citations. Citations must be plain text only.**

    3. Visuals:
    - Include up to 3 relevant images from ${searchToAnsweer.thumbnails}.
    - Use Markdown format: ![Alt text](URL)
    - Place images strategically to break up text and complement content.

    4. Additional Guidelines:
    - Adapt language to the user's expertise level.
    - Maintain a confident, authoritative, and professional tone.
    - Provide comprehensive, self-contained answers.
    - Avoid directing users to external sources for more information.
    - Focus solely on the news content, without any reference to sources.
    - Do not use any source attributions or mention any media outlets.
    - Omit all source names, descriptions, and references entirely.
    - Present only the news information itself, without indicating where it came from.
    - Place references at the end of the response if needed.
    - Always answer in Markdown format.

    Goal: Provide the most helpful and informative response, using inline citations for all relevant sentences at the end of regular paragraph sentences only.

    **FINAL REMINDER: All citations must be in plain text [number]:URL format only, placed at the end of sentences within regular paragraphs. No HTML or buttons allowed for citations. Do not include citations in headings, subheadings, or as standalone elements.**

    DO NOT use formats like:
    <button class="select-none no-underline">
      <a href="https://pagesix.com/" target="_blank" rel="noopener noreferrer">
        <span class="relative -top-[0rem] inline-flex">
          <span class="h-[1rem] min-w-[1rem] items-center justify-center rounded-full text-center px-1 text-xs font-mono shadow-lg bg-slate-300 dark:bg-gray-700 text-[0.60rem] text-primary">
            1
          </span>
        </span>
      </a>
    </button>`,
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
