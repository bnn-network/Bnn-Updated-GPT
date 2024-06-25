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
      <label
        className="citation-bubble inline-flex items-center justify-center  -mt-1 mx-0.5
  w-5 h-5 text-[11px] font-medium rounded-full
  bg-white 
  border border-gray-300
  text-black
  dark:bg-black dark:text-slate-100 dark:border-gray-600
  hover:bg-gray-100 hover:border-gray-400
  dark:hover:bg-gray-700 dark:hover:border-gray-500
  transition-all duration-150
  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 dark:focus:ring-gray-600"
        data-tooltip-id={`citation-{${number}}`}
        data-tooltip-content={`View source ${number}`}
      >
        <a
          href={`${href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full   flex items-center  justify-center"
        >
          {number}
        </a>
      </label>
      <Tooltip id={`citation-${number}`} />
    </>
  )
}
