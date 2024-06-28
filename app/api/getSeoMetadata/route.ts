import { NextRequest, NextResponse } from 'next/server'
import { generateDynamicMetadata, fetchContent } from '@/lib/seo'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const path = searchParams.get('path')

  try {
    const content = await fetchContent(path || '', query || undefined)
    const metadata = await generateDynamicMetadata(content)
    console.log('API generated metadata:', metadata)
    return NextResponse.json(metadata)
  } catch (error) {
    console.error('Error generating metadata:', error)
    return NextResponse.json(
      { error: 'Failed to generate metadata' },
      { status: 500 }
    )
  }
}
