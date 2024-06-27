'use client'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React from 'react'
import NoSsr from './no-ssr'

const ImageComponent = () => {
  const { theme, systemTheme } = useTheme()
  const conditionForTheme = !theme
    ? systemTheme === 'dark'
      ? 'https://d30ynstjdvogo0.cloudfront.net/BNN-Final-Logo-white.png'
      : 'https://d30ynstjdvogo0.cloudfront.net/BNN-Final-Logo-black.png'
    : theme === 'dark'
      ? 'https://d30ynstjdvogo0.cloudfront.net/BNN-Final-Logo-white.png'
      : 'https://d30ynstjdvogo0.cloudfront.net/BNN-Final-Logo-black.png'
  return (
    <div className="pl-2 pt-2">
      <a href="/">
        <NoSsr>
          <Image
            src={conditionForTheme}
            className={cn('h-8 lg:h-full w-auto opacity-90')}
            alt="Logo"
            width={66}
            height={20}
          />
        </NoSsr>
        <span className="sr-only">BNNGPT</span>
      </a>
    </div>
  )
}

export default ImageComponent
