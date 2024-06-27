'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { NextSeo } from 'next-seo'
import { OpenGraph, Twitter } from 'next-seo/lib/types'
import { generateDynamicMetadata, fetchContent } from '@/lib/seo'

export function DynamicSeo() {
  const [dynamicMetadata, setDynamicMetadata] = useState<{
    title: string;
    description: string;
    openGraph: OpenGraph;
    twitter: Twitter;
  } | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function updateMetadata() {
      const query = searchParams.get('query')
      if (query) {
        try {
          const content = await fetchContent(query)
          const metadata = await generateDynamicMetadata(content)
          setDynamicMetadata({
            title: metadata.title as string,
            description: metadata.description as string,
            openGraph: metadata.openGraph as OpenGraph,
            twitter: metadata.twitter as Twitter,
          })
        } catch (error) {
          console.error('Error updating metadata:', error)
        }
      }
    }

    updateMetadata()
  }, [searchParams])

  if (!dynamicMetadata) return null

  return (
    <NextSeo
      title={dynamicMetadata.title}
      description={dynamicMetadata.description}
      openGraph={dynamicMetadata.openGraph}
      twitter={dynamicMetadata.twitter}
    />
  )
}