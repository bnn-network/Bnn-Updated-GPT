import { Metadata } from 'next'
import { fetchContentAndMetadata, generateDynamicMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
  searchParams
}: {
  params: { slug: string[] }
  searchParams: { prequery?: string }
}): Promise<Metadata> {
  let extractedMetadata

  if (searchParams.prequery) {
    // Handle prequery parameter
    extractedMetadata = await fetchContentAndMetadata(searchParams.prequery)
  } else if (params.slug && params.slug.length > 0) {
    // Handle dynamic routes
    const path = `/${params.slug.join('/')}`
    extractedMetadata = await fetchContentAndMetadata(path)
  } else {
    // Default metadata for the root route
    extractedMetadata = {
      title: 'BNNGPT',
      description: 'Elevate Your Search Experience with AI.'
    }
  }

  // Use the generateDynamicMetadata function from seo.ts
  return generateDynamicMetadata(extractedMetadata)
}

export default function DynamicPage() {
  // The actual content will be rendered by your main component
  return null
}
