'use client'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React from 'react'

const ImageComponent = () => {
  const { theme, systemTheme } = useTheme()
  const conditionForTheme = !theme
    ? systemTheme === 'dark'
      ? '/images/logo-white.png'
      : '/images/logo-black.png'
    : theme === 'dark'
    ? '/images/logo-white.png'
    : '/images/logo-black.png'
  return (
    <div className="pl-2 pt-2">
      <a href="/">
        <Image
          src={conditionForTheme}
          className={cn('w-24 h-11')}
          alt="Logo"
          width={96}
          height={55}
        />
        <span className="sr-only">BNNGPT</span>
      </a>
    </div>
  )
}

export default ImageComponent
