'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import Head from 'next/head'
import {
  fetchContentAndMetadata,
  getMetadataObject,
  ExtractedMetadata
} from '@/lib/seo'

export function DynamicMetadata() {
  const [metadata, setMetadata] = useState<ExtractedMetadata | null>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    async function updateMetadata() {
      const prequery = searchParams.get('prequery')
      const isDynamicRoute = pathname.endsWith('/parameter')

      if (prequery || isDynamicRoute) {
        try {
          const query = prequery || pathname
          const extractedMetadata = await fetchContentAndMetadata(query)
          setMetadata(extractedMetadata)
        } catch (error) {
          console.error('Error updating metadata:', error)
        }
      }
    }

    updateMetadata()
  }, [searchParams, pathname])

  if (!metadata) return null

  const metadataObject = getMetadataObject(metadata)

  return (
    <Head>
      <title>{metadata.title}</title>
      {Object.entries(metadataObject).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
    </Head>
  )
}
