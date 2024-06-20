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
    <button className="select-none no-underline">
      <a className="" href="${href}" target="_blank">
        <span className="relative -top-[0rem] inline-flex">
          <span className="h-[1rem] min-w-[1rem] items-center justify-center rounded-full text-center px-1 text-xs font-mono shadow-lg bg-slate-300 dark:bg-gray-700 text-[0.60rem] text-primary">
            ${number}
          </span>
        </span>
      </a>
    </button>`
}

export function BotMessage({ content }: { content: StreamableValue<string> }) {
  const [data, error, pending] = useStreamableValue(content)
  const [processedData, setProcessedData] = useState('')

  useEffect(() => {
    if (data) {
      let preprocessedData = preprocessLaTeX(data)

      const sourceRegex = /\[(\d+)\]:\s*(\S+)/g
      const sources: { [key: number]: string } = {}

      let sourceMatch
      while ((sourceMatch = sourceRegex.exec(preprocessedData)) !== null) {
        const number = parseInt(sourceMatch[1])
        const url = sourceMatch[2]
        sources[number] = url
      }
      console.log(preprocessedData, 'preprocessedData')

      const patterns = [
        /References:\n*([\s\S]*)/i,
        /\*\*References\*\*\n*-+\n*([\s\S]*)/i,
       
        /References:\n-+\n([\s\S]*?)\n-+/i,
        /\*\*References\*\*\n*[\s\S]*$/i
      ]

      for (const pattern of patterns) {
        const match = preprocessedData.match(pattern)

        if (match) {
          console.log(`Matched pattern: ${pattern}`)
          preprocessedData = preprocessedData.replace(pattern, '')
          console.log('References removed successfully.')
        }
      }

      const citationRegex = /\[(\d+)\]:\s*(\S+)/g
      const citationRegex2 = /\[(\d+)\]/g
      let newData = preprocessedData
      if (preprocessedData.match(citationRegex) !== null) {
        newData = preprocessedData.replace(citationRegex, (match, number) => {
          const href = sources[parseInt(number)] || ''
          return CitationText({ number: parseInt(number), href })
        })
      }
      if (newData.match(citationRegex2) !== null) {
        newData = newData.replace(citationRegex2, (match, number) => {
          const href = sources[parseInt(number)] || ''
          return CitationText({ number: parseInt(number), href })
        })
      }

      const finalData = newData.replace(sourceRegex, '')

      setProcessedData(finalData)
    }
  }, [data])

  // Currently, sometimes error occurs after finishing the stream.
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
