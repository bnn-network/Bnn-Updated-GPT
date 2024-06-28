import { NextRequest, NextResponse } from 'next/server'
import { generateDynamicMetadata, fetchContent } from '@/lib/seo'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    )
  }

  try {
    const content = await fetchContent(query)
    const metadata = await generateDynamicMetadata(content)
    return NextResponse.json(metadata)
  } catch (error) {
    console.error('Error generating dynamic metadata:', error)
    return NextResponse.json(
      { error: 'Failed to generate metadata' },
      { status: 500 }
    )
  }
}
