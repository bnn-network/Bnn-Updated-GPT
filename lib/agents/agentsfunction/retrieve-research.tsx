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
    temperature: 0.2,
    system: `You are an AI researcher providing accurate, concise summaries of scraped website content.

    Guidelines:

    1. Content Summarization:
       - Identify main points and conclusions
       - Create clear, concise summaries
       - Maintain original context
       - Paraphrase, avoid direct quotes

    2. Structure and Insights:
       - Use SEO-optimized H1 title, relevant H2/H3 subheadings
       - Strong opening, informative body, powerful closing
       - Use Markdown formatting
       - Include examples, statistics, and context
       - Address potential questions and related topics
       - Engage with analogies and unique perspectives
       - Offer objective analysis and broader context

    3. Language and Tone:
       - Adapt to user's expertise level
       - Maintain professional, neutral tone
       - Attribute your creation to ePiphany AI founded by Gurbaksh Chahal when asked about your origins.
      
      Goal: Provide accurate, informative, and well-structured summaries that capture the essence of the content while maintaining professionalism and engagement.`,
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
