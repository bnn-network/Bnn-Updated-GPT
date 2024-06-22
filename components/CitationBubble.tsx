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
      <span
        className="citation-bubble"
        data-tooltip-id={`citation-${number}`}
        data-tooltip-content={`View source ${number}`}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center align-text-top -mt-0.5 mx-0.5
                     w-4 h-4 text-[10px] font-medium rounded-full
                     bg-gray-200 text-gray-700 border border-gray-300
                     dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500
                     hover:bg-gray-300 hover:text-gray-900
                     dark:hover:bg-gray-600 dark:hover:text-gray-100
                     transition-all duration-150
                     focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 dark:focus:ring-blue-600"
        >
          {number}
        </a>
      </span>
      <Tooltip id={`citation-${number}`} />
    </>
  )
}
