import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import {
  CoreMessage,
  ToolCallPart,
  ToolResultPart,
} from 'ai'
import { Section } from '@/components/section'
import { BotMessage } from '@/components/message'
import { researchOptionsManager } from './research-options-manager'
import chatResearch from './agentsfunction/chat-research'
import searchResearch from './agentsfunction/search-research'
import retrieveResearch from './agentsfunction/retrieve-research'

export async function researcher(
  uiStream: ReturnType<typeof createStreamableUI>,
  streamText: ReturnType<typeof createStreamableValue<string>>,
  messages: CoreMessage[],
  selectedModel: string,
  useSpecificModel?: boolean
) {
  let fullResponse = ''
  let hasError = false
  const answerSection = (
    <Section title="Answer">
      <BotMessage content={streamText.value} />
    </Section>
  )
  // Process the response
  const toolCalls: ToolCallPart[] = []
  const toolResponses: ToolResultPart[] = []

  const action: any = await researchOptionsManager(messages)
  if (action.object.next === 'chat') {
    const res = await chatResearch({
      fullResponse,
      toolResponses,
      toolCalls,
      messages,
      streamText,
      uiStream,
      hasError
    })
    return res
  } else if (action.object.next === 'search') {
    const res = await searchResearch({
      fullResponse,
      toolResponses,
      toolCalls,
      messages,
      streamText,
      uiStream,
      hasError,
      query: action.object.query
    })
    return res
  } else if (action.object.next === 'retrieve') {
    const res = await retrieveResearch({
      fullResponse,
      toolResponses,
      toolCalls,
      messages,
      streamText,
      uiStream,
      hasError,
      url: action.object.url
    })
    return res
  }
}
