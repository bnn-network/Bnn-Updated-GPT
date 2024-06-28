import { Metadata } from 'next'

export type ExtractedMetadata = {
  title: string
  description: string
}

export async function fetchContentAndMetadata(
  query: string,
  isGooglebot: boolean
): Promise<ExtractedMetadata> {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('NEXT_PUBLIC_BASE_URL is not defined')
    }

    const isPrequery = query.includes('?prequery=')
    const endpoint = isPrequery ? '/getparamquery' : '/getdynamiccontent'
    const param = isPrequery ? 'query' : 'path'

    // Add a 3-second delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }${endpoint}?${param}=${encodeURIComponent(query)}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Parse the HTML content
    const parser = new DOMParser()
    const doc = parser.parseFromString(data.content, 'text/html')

    // Extract title from the first <h1>, <h2>, or <h3> tag
    const titleElement = doc.querySelector('h1, h2, h3')
    const title = titleElement?.textContent?.trim() || 'BNNGPT'

    // Extract description from the text content following the title
    let description = ''
    if (titleElement) {
      let nextElement = titleElement.nextElementSibling
      while (nextElement && description.length < 160) {
        if (nextElement.textContent) {
          description += ' ' + nextElement.textContent.trim()
        }
        nextElement = nextElement.nextElementSibling
      }
    }
    description = description.trim().substring(0, 160) + '...'

    // If no description was found, use a default
    if (!description) {
      description = 'Elevate Your Search Experience with AI.'
    }

    return { title, description }
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
