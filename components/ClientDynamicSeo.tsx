'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { NextSeo } from 'next-seo'

export default function ClientDynamicSeo() {
  const [seoData, setSeoData] = useState({ title: '', description: '' })
  const pathname = usePathname()

  useEffect(() => {
    console.log('ClientDynamicSeo: useEffect triggered for pathname:', pathname)
    let intervalId: NodeJS.Timeout
    let retryCount = 0
    const maxRetries = 20

    const extractSeoData = () => {
      console.log('Attempting to extract SEO data... Attempt:', retryCount + 1)

      const answerSection = document.querySelector('.prose-sm.prose-neutral')

      if (answerSection) {
        const title =
          answerSection.querySelector('h1')?.textContent?.trim() || 'BNNGPT'
        const description =
          answerSection.querySelector('p')?.textContent?.trim() ||
          'Elevate Your Search Experience with AI.'

        console.log('Extracted raw data:', { title, description })

        if (
          title !== 'BNNGPT' ||
          description !== 'Elevate Your Search Experience with AI.'
        ) {
          const newSeoData = {
            title: title.slice(0, 60),
            description: description.slice(0, 160)
          }

          console.log('Setting new SEO data:', newSeoData)
          setSeoData(newSeoData)

          clearInterval(intervalId)
          console.log('Extraction complete, interval cleared')
        } else {
          console.log('Default content found, will retry...')
          retryCount++
          if (retryCount >= maxRetries) {
            console.log('Max retries reached, stopping extraction attempts')
            clearInterval(intervalId)
          }
        }
      } else {
        console.log('Answer section not found, will retry...')
        retryCount++
        if (retryCount >= maxRetries) {
          console.log('Max retries reached, stopping extraction attempts')
          clearInterval(intervalId)
        }
      }
    }

    intervalId = setInterval(extractSeoData, 2000) // Check every 2 seconds

    return () => {
      clearInterval(intervalId)
      console.log('Cleanup: interval cleared')
    }
  }, [pathname])

  console.log('Current SEO data:', seoData)

  if (!seoData.title && !seoData.description) {
    console.log('No SEO data available, not rendering NextSeo')
    return null
  }

  console.log('Rendering NextSeo with data:', seoData)
  return (
    <NextSeo
      title={seoData.title}
      description={seoData.description}
      openGraph={{
        title: seoData.title,
        description: seoData.description,
        images: [
          {
            url: '/og-image.jpg',
            width: 800,
            height: 600,
            alt: seoData.title
          }
        ]
      }}
      twitter={{
        handle: '@epiphanyAITech',
        site: '@epiphanyAITech',
        cardType: 'summary_large_image'
      }}
    />
  )
}
