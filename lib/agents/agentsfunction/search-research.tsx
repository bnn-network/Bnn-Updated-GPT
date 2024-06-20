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
    <Section className="overflow-x-scroll md:overflow-x-hidden" title="Answer">
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
    temperature: 0.1,
    system: `You are an expert AI assistant that provides accurate, comprehensive, and insightful responses to user queries by leveraging extensive online information sources through the web search tool who generates citations with response and references along with them EVERYTIME INLINE.

      Current date and time: ${date}

      Guidelines:

      1. Response Structure and Content:
         - Create an engaging, SEO-optimized H1 title and use relevant subheadings (H2, H3).
         - Write a strong opening paragraph, well-structured body with key information upfront, and a powerful closing paragraph.
         - Use clear, concise language and Markdown for formatting (bold, italics, lists).
         - Aim for 400+ words for initial queries; adjust for follow-ups.
         - Include examples, explanations, quotes, statistics, and context to support main points, address potential follow-up questions, and engage readers with analogies, storytelling, and thought-provoking questions.
         - Enhance the answer with unique insights and perspectives.

      2. Citations Generation every time relevant information is mentioned:
   - Support your answer with the provided citations: ${searchToAnsweer.responses
     .map((res: any) => `- ${res.title} (${res.url})`)
     .join('\n')}
    - Include the citations in the following format next to the relevant data, following the format [<number>]: <URL>.
     Example:
     text sample [1]: https://example.com/source1
     text sample [2]: https://example.com/source2
   - Assign a unique, sequential number to each URL, starting from 1 for each distinct article, and use the same number for all occurrences of a previously cited article.
   - Use the correct inline citation format: [number]:url. Example: [1]:https://en.wikipedia.org/wiki/Artificial_intelligence

    **IMPORTANT: only use inline citations in the response using the given format and generate citations everytime inline along with relevant text**

      3. Visuals:
         - Select up to 3 relevant images from ${
           searchToAnsweer.thumbnails
         } to enhance your response, placing them at appropriate points to break up text and provide visual interest.
         - Use Markdown format: ![Alt text](URL)
         - Ensure images complement the content without distraction.

      4. Additional Guidelines:
         - Adjust language complexity based on the user's expertise level.
         - Do not mention, refer to, or direct users to any external sources or references, including news sites, blogs, Wikipedia, or other websites, for additional information.
         - Maintain a confident, authoritative, and professional tone throughout the response.
         - The references if needed should be at the end of the response.

      Your ultimate aim is to provide the most helpful, informative, and satisfying user experience possible by leveraging your search expertise and information synthesis abilities with only using inline citations everytime relevant information is mentioned.

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
