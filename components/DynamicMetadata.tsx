'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'
import {
  fetchContentAndMetadata,
  getMetadataObject,
  ExtractedMetadata
} from '@/lib/seo'

export function DynamicMetadata() {
  const [metadata, setMetadata] = useState<ExtractedMetadata | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function updateMetadata() {
      const query = searchParams.get('query')
      if (query) {
        try {
          const extractedMetadata = await fetchContentAndMetadata(query)
          setMetadata(extractedMetadata)
        } catch (error) {
          console.error('Error updating metadata:', error)
        }
      }
    }

    updateMetadata()
  }, [searchParams])

  if (!metadata) return null

  const metadataObject = getMetadataObject(metadata)

  return (
    <Head>
      {Object.entries(metadataObject).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
    </Head>
  )
}
