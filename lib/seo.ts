import { Metadata } from 'next'
import { JSDOM } from 'jsdom'

export async function generateDynamicMetadata(html: string): Promise<Metadata> {
  const dom = new JSDOM(html)
  const document = dom.window.document

  const answerDiv = document.querySelector('#answer')
  const title = answerDiv?.querySelector('h1, h2')?.textContent || 'BNNGPT'
  const description =
    answerDiv?.querySelector('p')?.textContent?.substring(0, 160) + '...' ||
    'Elevate Your Search Experience with AI.'

  return {
    title: `${title} - BNNGPT`,
    description,
    openGraph: {
      title: `${title} - BNNGPT`,
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
      title: `${title} - BNNGPT`,
      description,
      images: ['/og-image.jpg'],
      site: '@epiphanyAITech',
      creator: '@epiphanyAITech'
    }
  }
}

export async function fetchContent(query: string): Promise<string> {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('NEXT_PUBLIC_BASE_URL is not defined')
    }

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/getparamquery?query=${encodeURIComponent(query)}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    console.error('Error fetching content:', error)
    return '' // Return empty string or some default content in case of error
  }
}
