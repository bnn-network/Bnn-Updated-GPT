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
          console.log('Fetching metadata for:', query)
          // Note: We're passing false for isGooglebot here because this is client-side code
          const extractedMetadata = await fetchContentAndMetadata(query, false)
          console.log('Extracted metadata:', extractedMetadata)
          setMetadata(extractedMetadata)
        } catch (error) {
          console.error('Error updating metadata:', error)
        }
      }
    }

    updateMetadata()
  }, [searchParams, pathname])

  useEffect(() => {
    if (metadata) {
      console.log('Updating document metadata:', metadata)
      document.title = metadata.title
      const descMeta = document.querySelector('meta[name="description"]')
      if (descMeta) {
        descMeta.setAttribute('content', metadata.description)
      }
      // Update OpenGraph and Twitter meta tags
      const metaTags = document.getElementsByTagName('meta')
      for (let i = 0; i < metaTags.length; i++) {
        const tag = metaTags[i]
        const property = tag.getAttribute('property')
        const name = tag.getAttribute('name')
        if (property === 'og:title' || name === 'twitter:title') {
          tag.setAttribute('content', metadata.title)
        }
        if (property === 'og:description' || name === 'twitter:description') {
          tag.setAttribute('content', metadata.description)
        }
      }
    }
  }, [metadata])

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
