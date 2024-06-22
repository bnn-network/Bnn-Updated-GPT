// CitationBubble.tsx
import React from 'react'
import { Tooltip } from 'react-tooltip'

interface CitationBubbleProps {
  number: number
  href: string
}

export const CitationBubble: React.FC<CitationBubbleProps> = ({
  number,
  href
}) => {
  return (
    <>
      <sup
        className="citation-bubble"
        data-tooltip-id={`citation-${number}`}
        data-tooltip-content={`View source ${number}`}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-slate-300 dark:bg-gray-700 text-primary px-1 text-xs font-mono shadow-lg"
        >
          {number}
        </a>
      </sup>
      <Tooltip id={`citation-${number}`} />
    </>
  )
}
