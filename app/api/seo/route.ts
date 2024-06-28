// app/api/seo/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getChat } from '@/lib/actions/chat'

export async function GET(request: NextRequest) {
  const chatId = request.nextUrl.searchParams.get('chatId')

  console.log('Received SEO request for chatId:', chatId)

  if (!chatId) {
    console.log('No chatId provided')
    return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 })
  }

  try {
    const chat = await getChat(chatId)
    if (!chat) {
      console.log('Chat not found for chatId:', chatId)
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
    }

    // Extract title and first message for description
    const title = chat.title || 'BNNGPT Search'
    const description =
      chat.messages[0]?.content || 'Elevate Your Search Experience with AI.'

    const seoData = {
      title: title.slice(0, 60), // Limit title to 60 characters
      description: description.slice(0, 160) // Limit description to 160 characters
    }

    console.log('Generated SEO data:', seoData)
    return NextResponse.json(seoData)
  } catch (error) {
    console.error('Error fetching chat for SEO:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
