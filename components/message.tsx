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
import rehypeSanitize from 'rehype-sanitize'
import remarkRehype from 'remark-rehype'

const CitationText = ({ number, href }: { number: number; href: string }) => {
  return `
    <button class="select-none no-underline">
      <a class="" href="${href}" target="_blank">
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

      // Handle special cases where HTML is mistakenly rendered
      preprocessedData = preprocessedData.replace(
        /<button class="select-none no-underline">[\s\S]*?<\/button>\(([^)]+)\)/g,
        (match, url) => {
          const numberMatch = match.match(/class="h-\[1rem\].*?">(\d+)<\/span>/)
          if (numberMatch) {
            const number = parseInt(numberMatch[1])
            return `[${number}](${url})`
          }
          return match
        }
      )

      if (isChatResearch) {
        // For chat-research, keep the original [1] references intact
        // No processing needed
      } else {
        // Process citations for search-research.tsx
        const citationRegex =
          /\[(\d+)\](?:\((https?:\/\/[^\s"]+)(?:\s+"([^"]+)")?\)|\:(https?:\/\/[^\s]+))/g
        const citations: { [key: number]: { url: string; title?: string } } = {}

        let citationMatch
        while (
          (citationMatch = citationRegex.exec(preprocessedData)) !== null
        ) {
          const number = parseInt(citationMatch[1])
          const url = citationMatch[2] || citationMatch[4] // URL can be in group 2 or 4
          const title = citationMatch[3]
          citations[number] = { url, title }
        }

        preprocessedData = preprocessedData.replace(
          /(\S+)(\s*)(\[(\d+)\](?:\((https?:\/\/[^\s"]+)(?:\s+"([^"]+)")?\)|\:(https?:\/\/[^\s]+)))/g,
          (match, precedingWord, space, fullCitation, number) => {
            const citation = citations[parseInt(number)]
            const citationBubble = citation
              ? CitationText({ number: parseInt(number), href: citation.url })
              : fullCitation
            return `${precedingWord}${citationBubble}${space}`
          }
        )
      }

      // Remove references section only for search-research
      if (!isChatResearch) {
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
