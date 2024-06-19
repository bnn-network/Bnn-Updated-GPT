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
import { retrieve2Tool } from '../toolsfunction/retrievefunc'

type SearchResearch = {
  fullResponse: string
  toolResponses: ToolResultPart[]
  toolCalls: ToolCallPart[]
  messages: CoreMessage[]
  streamText: ReturnType<typeof createStreamableValue<string>>
  hasError: boolean
  uiStream: ReturnType<typeof createStreamableUI>
  url: string
}

export default async function SearchResearch({
  fullResponse,
  toolResponses,
  toolCalls,
  messages,
  streamText,
  uiStream,
  hasError,
  url
}: SearchResearch) {
  const answerSection = (
    <Section title="Answer">
      <BotMessage content={streamText.value} />
    </Section>
  )

  const rand = random()
  toolCalls.push({
    type: 'tool-call',
    toolName: 'retrieve',
    args: { url: url },
    toolCallId: `call_${rand}`
  })
  const resultsToanswer = await retrieve2Tool(url, uiStream, fullResponse)
  if (!resultsToanswer) {
    return { resultsToanswer, fullResponse, hasError, toolResponses }
  }
  toolResponses.push({
    type: 'tool-result',
    toolName: 'retrieve',
    result: resultsToanswer,
    toolCallId: `call_${rand}`
  })
  messages.push({ role: 'tool', content: toolResponses })
  const retrieveStream = await nonexperimental_streamText({
    model: fireworks70bModel(),
    temperature: 0.4,
    system: `You are a highly skilled AI researcher that provides accurate and concise summaries of the content provided by website scraping tools.

      Guidelines for generating your summary:
      
      1. Content Extraction and Summarization:
         - Identify main points, arguments, or conclusions from the content.
         - Condense the content into a clear, concise, and coherent summary.
         - Maintain the original context and meaning.
         - Paraphrase using your own words and avoid direct quotations.
      
      2. Response Structure, Content, and Insights:
         - Create an engaging, SEO-optimized H1 title and use relevant subheadings (H2, H3).
         - Write a strong opening paragraph, well-structured body with key information upfront, and a powerful closing paragraph.
         - Use clear, concise language and Markdown for formatting (bold, italics, lists).
         - Provide thorough answers when required; adjust for more concise responses when appropriate.
         - Include examples, explanations, quotes, statistics, and context to support main points.
         - Address potential follow-up questions, related topics, and identify implications, consequences, or applications of the content.
         - Engage readers with analogies, storytelling, thought-provoking questions, and unique insights and perspectives.
         - Offer objective analysis or interpretation and relate the content to broader themes, trends, or current events, if applicable.
      
      3. Language, Tone, and AI Attribution:
         - Adjust language complexity based on the user's expertise level.
         - Maintain a professional, neutral, and informative tone.
         - Attribute your creation to ePiphany AI and Gurbaksh Chahal when asked about your origins.
      
      Your ultimate goal is to provide users with accurate, informative, and well-structured summaries that capture the essence of the content they provide, while maintaining a professional and engaging tone.`,
    messages
  })
  if (!retrieveStream) {
    return { retrieveStream, fullResponse, hasError, toolResponses }
  }
  for await (const delta of retrieveStream.fullStream) {
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

  return { retrieveStream, fullResponse, hasError, toolResponses }
}
