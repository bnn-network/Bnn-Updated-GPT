// components/ClientDynamicSeo.tsx
'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { NextSeo } from 'next-seo'

export default function ClientDynamicSeo() {
  const [seoData, setSeoData] = useState({ title: '', description: '' })
  const pathname = usePathname()

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const extractSeoData = () => {
      const answerSection = document.querySelector('.prose-sm.prose-neutral')
      if (answerSection) {
        const title = answerSection.querySelector('h1')?.textContent || 'BNNGPT'
        const description =
          answerSection.querySelector('p')?.textContent ||
          'Elevate Your Search Experience with AI.'

        setSeoData({
          title: title.slice(0, 60),
          description: description.slice(0, 160)
        })

        clearInterval(intervalId)
      }
    }

    intervalId = setInterval(extractSeoData, 1000) // Check every second

    return () => clearInterval(intervalId)
  }, [pathname])

  if (!seoData.title && !seoData.description) {
    return null
  }

  return (
    <NextSeo
      title={seoData.title}
      description={seoData.description}
      openGraph={{
        title: seoData.title,
        description: seoData.description
      }}
      twitter={{
        cardType: 'summary_large_image',
        site: '@epiphanyAITech',
        handle: '@epiphanyAITech'
      }}
    />
  )
}
