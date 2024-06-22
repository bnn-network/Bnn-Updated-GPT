'use client'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { MemoizedReactMarkdown } from './ui/markdown'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { useState, useEffect } from 'react'
import rehypeRaw from 'rehype-raw'

const CitationBubble = ({ number, href }: { number: number; href: string }) => {
  return `
    <button class="select-none no-underline">
      <a href="${href}" target="_blank" rel="noopener noreferrer">
        <span class="relative -top-[0rem] inline-flex">
          <span class="h-[1rem] min-w-[1rem] items-center justify-center rounded-full text-center px-1 text-xs font-mono shadow-lg bg-slate-300 dark:bg-gray-700 text-[0.60rem] text-primary">
            ${number}
          </span>
        </span>
      </a>
    </button>`
}

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
      let preprocessedData = preprocessLaTeX(data)

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

      console.log(preprocessedData,'preprocessedData')
    

      if (!isChatResearch) {
        // For search-research mode, replace citations with CitationBubble
        preprocessedData = preprocessedData.replace(
          /\[(\d+)\](?:\((https?:\/\/[^\s"]+)(?:\s+"[^"]+")?\)|:\s*(\S+)|(?!\(|:))/g,
          (match, number) =>
            CitationBubble({
              number: parseInt(number),
              href: citations[parseInt(number)]
            })
        )

        // Handle any remaining AI-generated HTML citations
        preprocessedData = preprocessedData.replace(
          /<button class="select-none no-underline">[\s\S]*?<\/button>/g,
          match => {
            const numberMatch = match.match(
              /class="h-\[1rem\].*?">(\d+)<\/span>/
            )
            const hrefMatch = match.match(/href="([^"]*)"/)
            if (numberMatch && hrefMatch) {
              return CitationBubble({
                number: parseInt(numberMatch[1]),
                href: hrefMatch[1]
              })
            }
            return match
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
      // For chat-research mode, we don't need to do anything as the citations are already in [1] format

      setProcessedData(preprocessedData)
    }
  }, [data, isChatResearch])

  if (error) return <div>Error</div>

  return (
    <MemoizedReactMarkdown
      rehypePlugins={[
        [rehypeExternalLinks, { target: '_blank' }],
        rehypeKatex,
        [rehypeRaw]
      ]}
      remarkPlugins={[remarkGfm, remarkMath]}
      className="prose-sm prose-neutral prose-a:text-accent-foreground/50"
    >
      {processedData}
    </MemoizedReactMarkdown>
  )
}

const preprocessLaTeX = (content: string) => {
  const blockProcessedContent = content.replace(
    /\\\[([\s\S]*?)\\\]/g,
    (_, equation) => `$$${equation}$$`
  )
  const inlineProcessedContent = blockProcessedContent.replace(
    /\\\(([\s\S]*?)\\\)/g,
    (_, equation) => `$${equation}$`
  )
  return inlineProcessedContent
}
