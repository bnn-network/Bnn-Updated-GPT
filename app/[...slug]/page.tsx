import { Metadata } from 'next'
import { fetchContentAndMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
  searchParams
}: {
  params: { slug: string[] }
  searchParams: { prequery?: string }
}): Promise<Metadata> {
  let metadata

  if (searchParams.prequery) {
    // Handle prequery parameter
    metadata = await fetchContentAndMetadata(searchParams.prequery)
  } else if (params.slug && params.slug.length > 0) {
    // Handle dynamic routes
    const path = `/${params.slug.join('/')}`
    metadata = await fetchContentAndMetadata(path)
  } else {
    // Default metadata for the root route
    metadata = {
      title: 'BNNGPT',
      description: 'Elevate Your Search Experience with AI.'
    }
  }

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: '/og-image.jpg',
          width: 800,
          height: 600,
          alt: metadata.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: ['/og-image.jpg'],
      site: '@epiphanyAITech',
      creator: '@epiphanyAITech'
    }
  }
}

export default function DynamicPage() {
  // The actual content will be rendered by your main component
  return null
}
