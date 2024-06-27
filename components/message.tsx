'use client'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { MemoizedReactMarkdown } from './ui/markdown'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { useEffect, useRef } from 'react'
import rehypeRaw from 'rehype-raw'
import { CitationBubble } from './CitationBubble'
import ReactDOMServer from 'react-dom/server'
import 'katex/dist/katex.min.css'
import { Components } from 'react-markdown'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'

export function BotMessage({
  content,
  isChatResearch = false
}: {
  content: StreamableValue<string>
  isChatResearch?: boolean
}) {
  const [data, error, pending] = useStreamableValue(content)
  const processedDataRef = useRef('')

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
        let url = match[2] || match[3]

        // Remove trailing period only if it's not part of the URL structure
        if (
          url.endsWith('.') &&
          !url.endsWith('..') &&
          !url.endsWith('.com.')
        ) {
          url = url.slice(0, -1)
        }

        citations[number] = url
      }

      if (!isChatResearch) {
        // For search-research mode, replace citations with CitationBubble
        preprocessedData = preprocessedData.replace(
          /(\S+?)(\s*)(\[(\d+)\](?:\((https?:\/\/[^\s"]+)(?:\s+"[^"]+")?\)|:\s*(\S+)|(?!\(|:)))/g,
          (match, precedingText, whitespace, fullCitation, number) => {
            const citationComponent = (
              <CitationBubble
                number={parseInt(number)}
                href={citations[parseInt(number)]}
              />
            )
            // Add a period if the preceding text doesn't end with punctuation
            const punctuation = /[.!?]$/.test(precedingText) ? '' : '.'
            return `${precedingText}${punctuation}${whitespace}${ReactDOMServer.renderToString(
              citationComponent
            )}`
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

      processedDataRef.current = preprocessedData
    }
  }, [data, isChatResearch])

  useEffect(() => {
    const highlightCode = () => {
      Prism.highlightAll()
    }

    highlightCode()
    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(highlightCode)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  if (error) return <div>Error</div>

  const components: Components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <div className="code-block">
          <div className="code-header">
            <span>{match[1]}</span>
            <button
              onClick={() => navigator.clipboard.writeText(String(children))}
            >
              Copy code
            </button>
          </div>
          <pre className={className}>
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  return (
    <MemoizedReactMarkdown
      rehypePlugins={[
        [rehypeExternalLinks, { target: '_blank' }],
        rehypeRaw,
        rehypeKatex
      ]}
      remarkPlugins={[remarkGfm, remarkMath]}
      disallowedElements={['span']}
      className="prose-sm prose-neutral prose-a:text-accent-foreground/50"
      components={components}
    >
      {processedDataRef.current || data}
    </MemoizedReactMarkdown>
  )
}