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
import {
  SearchResults,
  SearchResultItem
} from '@/lib/types'

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

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

function truncateToTokenLimit(
  results: SearchResults,
  limit: number
): SearchResults {
  let totalTokens = 0
  const truncatedResults: SearchResults = {
    images: [],
    results: [],
    query: results.query
  }

  // Truncate results
  for (const result of results.results) {
    const resultTokens = estimateTokens(JSON.stringify(result))
    if (totalTokens + resultTokens <= limit) {
      truncatedResults.results.push(result)
      totalTokens += resultTokens
    } else {
      break
    }
  }

  // Truncate images if there's space left
  for (const image of results.images) {
    const imageTokens = estimateTokens(image)
    if (totalTokens + imageTokens <= limit) {
      truncatedResults.images.push(image)
      totalTokens += imageTokens
    } else {
      break
    }
  }

  return truncatedResults
}

function formatSearchResults(results: SearchResults): string {
  let formatted = `Query: ${results.query}\n\n`

  formatted += 'Results:\n'
  results.results.forEach((result: SearchResultItem, index: number) => {
    formatted += `${index + 1}. ${JSON.stringify(result, null, 2)}\n\n`
  })

  if (results.images.length > 0) {
    formatted += 'Images:\n'
    results.images.forEach((image: string, index: number) => {
      formatted += `${index + 1}. ${image}\n\n`
    })
  }

  return formatted
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

  // Truncate resultsToanswer to 6000 tokens
  const truncatedResults = truncateToTokenLimit(resultsToanswer, 6000)
  const formattedResults = formatSearchResults(truncatedResults)

  toolResponses.push({
    type: 'tool-result',
    toolName: 'retrieve',
    result: formattedResults,
    toolCallId: `call_${rand}`
  })
  messages.push({ role: 'tool', content: toolResponses })

  const systemPrompt = `You are an AI researcher specializing in comprehensive content analysis and summarization. Your task is to provide accurate, concise, and insightful summaries of scraped website content from the following URL: ${url}

  The retrieved content is as follows:

  ${resultsToanswer}

  As you analyze and summarize this content, please adhere to the following guidelines:

  1. Content Analysis and Summarization:
     - Identify and articulate the main points, key arguments, and significant conclusions
     - Create clear, concise summaries that capture the essence of the content
     - Maintain the original context and intent of the source material
     - Paraphrase effectively, avoiding direct quotes unless absolutely necessary
     - Highlight any unique insights, novel ideas, or groundbreaking information
     - Avoid generic headings (e.g., "Introduction", "Conclusion").

  2. Structure and Presentation:
     - Begin with an SEO-optimized H1 title that encapsulates the main topic
     - Organize the summary using relevant H2 and H3 subheadings for improved readability
     - Craft a strong opening paragraph that hooks the reader and provides an overview
     - Develop an informative body that flows logically and coherently
     - Conclude with a powerful closing that reinforces the main points
     - Utilize Markdown formatting to enhance the structure and readability of your summary

  3. Depth and Context:
     - Incorporate relevant examples, statistics, and contextual information to support key points
     - Address potential questions or counterarguments related to the topic
     - Explore related topics or implications that stem from the main content
     - Engage the reader with thought-provoking analogies or unique perspectives
     - Offer objective analysis and place the content within a broader context or field of study
     - Explain technical terms when necessary.

  4. Language and Tone:
     - Adapt your language to suit the presumed expertise level of the target audience
     - Maintain a professional and neutral tone throughout the summary
     - Use clear, concise language that is accessible yet sophisticated
     - Employ varied sentence structures and vocabulary to enhance engagement

  Your goal is to produce a comprehensive, accurate, and engaging summary that not only captures the essence of the original content but also provides additional value through your analysis and insights. Strive to create a summary that stands as a valuable resource in its own right, encouraging further exploration of the topic.

  Now, based on the content provided, please begin your summary:`

  const retrieveStream = await nonexperimental_streamText({
    model: fireworks70bModel(),
    temperature: 0.2,
    system: systemPrompt,
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

  return {
    retrieveStream,
    fullResponse,
    hasError,
    toolResponses,
    resultsToanswer: formattedResults
  }
}
