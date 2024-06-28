import { Metadata } from 'next'

export async function generateDynamicMetadata(html: string): Promise<Metadata> {
  const titleMatch =
    html.match(/<h1[^>]*>(.*?)<\/h1>/i) || html.match(/<h2[^>]*>(.*?)<\/h2>/i)
  const descriptionMatch = html.match(/<p[^>]*>(.*?)<\/p>/i)

  const title = titleMatch ? titleMatch[1].trim() : 'BNNGPT'
  const description = descriptionMatch
    ? descriptionMatch[1].trim().substring(0, 157) + '...'
    : 'Elevate Your Search Experience with AI.'

  console.log('Generated SEO Title:', title)
  console.log('Generated SEO Description:', description)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: '/og-image.jpg',
          width: 800,
          height: 600,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
      site: '@epiphanyAITech',
      creator: '@epiphanyAITech'
    }
  }
}

export async function fetchContent(
  path: string,
  query?: string
): Promise<string> {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('NEXT_PUBLIC_BASE_URL is not defined')
    }

    let url: string
    if (query) {
      // For prequery format
      url = `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/getparamquery?query=${encodeURIComponent(query)}`
    } else {
      // For /parameter format
      url = `${process.env.NEXT_PUBLIC_BASE_URL}${path}/parameter`
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    console.error('Error fetching content:', error)
    return '' // Return empty string or some default content in case of error
  }
}
