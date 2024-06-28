// components/DynamicSeo.tsx
'use client'
import { NextSeo } from 'next-seo'
import { OpenGraph, Twitter } from 'next-seo/lib/types'

interface DynamicSeoProps {
  content: {
    title: string
    description: string
  } | null
}

export function DynamicSeo({ content }: DynamicSeoProps) {
  if (!content) return null

  const title = content.title || 'BNNGPT'
  const description = content.description
    ? content.description.length > 157
      ? content.description.substring(0, 157) + '...'
      : content.description
    : 'Elevate Your Search Experience with AI.'

  console.log('DynamicSeo applying metadata:', { title, description })

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images: [{ url: '/og-image.jpg', width: 800, height: 600, alt: title }]
      }}
      twitter={{
        cardType: 'summary_large_image',
        site: '@epiphanyAITech',
        handle: '@epiphanyAITech'
      }}
    />
  )
}
