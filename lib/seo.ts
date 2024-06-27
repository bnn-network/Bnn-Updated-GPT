import { Metadata } from 'next'

export type ExtractedMetadata = {
  title: string
  description: string
}

export async function fetchContentAndMetadata(
  query: string
): Promise<ExtractedMetadata> {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('NEXT_PUBLIC_BASE_URL is not defined')
    }

    const isPrequery = query.includes('?prequery=')
    const endpoint = isPrequery ? '/getparamquery' : '/getdynamiccontent'
    const param = isPrequery ? 'query' : 'path'

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }${endpoint}?${param}=${encodeURIComponent(query)}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      title: data.title || 'BNNGPT',
      description: data.description || 'Elevate Your Search Experience with AI.'
    }
  } catch (error) {
    console.error('Error fetching content:', error)
    return {
      title: 'BNNGPT',
      description: 'Elevate Your Search Experience with AI.'
    }
  }
}

export function generateDynamicMetadata(
  extractedMetadata: ExtractedMetadata
): Metadata {
  return {
    title: extractedMetadata.title,
    description: extractedMetadata.description,
    openGraph: {
      title: extractedMetadata.title,
      description: extractedMetadata.description,
      images: [
        {
          url: '/og-image.jpg',
          width: 800,
          height: 600,
          alt: extractedMetadata.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: extractedMetadata.title,
      description: extractedMetadata.description,
      images: ['/og-image.jpg'],
      site: '@epiphanyAITech',
      creator: '@epiphanyAITech'
    }
  }
}

export function getMetadataObject(
  extractedMetadata: ExtractedMetadata
): Record<string, string> {
  return {
    title: extractedMetadata.title,
    description: extractedMetadata.description,
    'og:title': extractedMetadata.title,
    'og:description': extractedMetadata.description,
    'og:image': '/og-image.jpg',
    'twitter:card': 'summary_large_image',
    'twitter:title': extractedMetadata.title,
    'twitter:description': extractedMetadata.description,
    'twitter:image': '/og-image.jpg',
    'twitter:site': '@epiphanyAITech',
    'twitter:creator': '@epiphanyAITech'
  }
}
