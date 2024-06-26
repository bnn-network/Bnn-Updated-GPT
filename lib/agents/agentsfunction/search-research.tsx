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
    - Initial answer: SEO-optimized H1 title and relevant H2/H3 subheadings
    - Strong opening, informative body, powerful closing
    - 400+ words for initial answers, adjust for follow-ups
    - Follow-ups: answer directly without headings
    - Present key information first, then supporting details
    - Include examples, quotes, statistics, and context
    - Provide unique insights and perspectives
    - Use analogies and thought-provoking questions
    - Add historical background or real-world applications
    - Anticipate follow-up questions
    - Avoid generic headings (e.g., "Introduction", "Conclusion")
    - Explain technical terms when needed

      Formatting and Language:
    - Use Markdown: bold for emphasis, italics for quotes, lists
    - Use clear, engaging language

      2. Citations Generation:

        Sources: ${searchToAnsweer.responses
          .map((res: any) => `- ${res.title} (${res.url})`)
          .join('\n')}

        Format and Placement:
        - Use ONLY simple text-based inline citations at the end of sentences within regular paragraphs
        - Format: [number]:URL
        - Example: The Earth orbits the Sun. [1]:https://example.com/solar-system
        - DO NOT use any HTML, or other formatting for citations
        - Use plain text only

        Numbering and Multiple Sources:
        - Assign unique numbers to URLs, starting from 1
        - Reuse numbers for repeat citations
        - For multiple sources in one sentence: The Sun is very hot. [1]:url1 [3]:url3

        Do Not Include Citations In:
        - Headings
        - Subheadings
        - Introductory sentences
        - Concluding sentences
        - Standalone elements

        Best Practices:
        - Ensure citations are accurate and support the information
        - Balance citation frequency with readability

    3. Visuals:
    - Include up to 3 relevant images from ${searchToAnsweer.thumbnails}.
    - Use Markdown format: ![Alt text](URL)
    - Place images strategically to break up text and complement content.

    4. Additional Guidelines:
    - Focus solely on the content itself
    - Present information without indicating its origin
    - Always answer in Markdown format
    - Adapt language to the user's expertise level
    - Maintain a confident, authoritative, and professional tone
    - Do not reference or attribute sources in any way
    - Avoid directing users to external sources for more information
    - Omit all source names, descriptions, and media outlet mentions from content and headings
    - If necessary, place references at the end of the response only.
      Examples of What to Avoid:
      - "Us Weekly:..."
      - "TMZ:..."
      - "Page Six:..."
      - "Entertainment Tonight's..."
      - "CNN reports..."
      - "According to The New York Times..."

    Goal: Provide the most helpful and informative response, using inline citations for all relevant sentences at the end of regular paragraph sentences only.

    **FINAL REMINDER: All citations must be in plain text [number]:URL format only, placed at the end of sentences within regular paragraphs. No HTML allowed for citations. Do not include citations in headings, subheadings, or as standalone elements.**

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
