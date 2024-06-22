'use client'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { MemoizedReactMarkdown } from './ui/markdown'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { useState, useEffect } from 'react'
import rehypeRaw from 'rehype-raw'
import { CitationBubble } from './CitationBubble'
import ReactDOMServer from 'react-dom/server'
import 'katex/dist/katex.min.css'

export function BotMessage({
  content,
  isChatResearch = false
}: {
  content: StreamableValue<string>
  isChatResearch?: boolean
}) {
  const [data, error, pending] = useStreamableValue(content)
  const [processedData, setProcessedData] = useState('')

  useEffect(() => {
    if (data) {
      let preprocessedData = data

      // Extract all citations and their URLs
      const citations: { [key: number]: string } = {}
      const citationRegex =
        /\[(\d+)\](?:\((https?:\/\/[^\s"]+)(?:\s+"[^"]+")?\)|:\s*(\S+))/g
      let match
      while ((match = citationRegex.exec(preprocessedData)) !== null) {
        const number = parseInt(match[1])
        const url = match[2] || match[3]
        citations[number] = url
      }

      if (!isChatResearch) {
        // For search-research mode, replace citations with CitationBubble
        preprocessedData = preprocessedData.replace(
          /\[(\d+)\](?:\((https?:\/\/[^\s"]+)(?:\s+"[^"]+")?\)|:\s*(\S+)|(?!\(|:))/g,
          (match, number) => {
            const citationComponent = (
              <CitationBubble
                number={parseInt(number)}
                href={citations[parseInt(number)]}
              />
            )
            return ReactDOMServer.renderToString(citationComponent)
          }
        )

        // Remove references section for search-research
        const patterns = [
          /References:\n*([\s\S]*)/i,
          /\*\*References\*\*\n*-+\n*([\s\S]*)/i,
          /References:\n-+\n([\s\S]*?)\n-+/i,
          /\*\*References\*\*\n*[\s\S]*$/i
        ]

        for (const pattern of patterns) {
          const match = preprocessedData.match(pattern)
          if (match) {
            preprocessedData = preprocessedData.replace(pattern, '')
          }
        }

        // Remove any remaining [number]: url patterns for search-research
        preprocessedData = preprocessedData.replace(
          /\[\d+\]:\s*https?:\/\/\S+/g,
          ''
        )
      }

      setProcessedData(preprocessedData)
    }
  }, [data, isChatResearch])

  if (error) return <div>Error</div>

  return (
    <MemoizedReactMarkdown
      rehypePlugins={[
        [rehypeExternalLinks, { target: '_blank' }],
        rehypeRaw,
        rehypeKatex
      ]}
      remarkPlugins={[remarkGfm, remarkMath]}
      className="prose-sm prose-neutral prose-a:text-accent-foreground/50"
    >
      {processedData}
    </MemoizedReactMarkdown>
  )
}
