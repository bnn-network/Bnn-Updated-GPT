import { notFound, redirect } from 'next/navigation'
import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { AI } from '@/app/actions'
import { auth } from '@clerk/nextjs/server'

export const maxDuration = 60

export interface SearchPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SearchPageProps) {
  const chat = await getChat(params.id)

  return {
    title:
      chat?.messages && chat.messages.length > 0
        ? chat.messages
            .filter(m => m.role === 'assistant')[0]
            ?.content.substring(0, 90)
            .replace(/\n/g, '')
            .replace(/\s\s+/g, ' ')
            .replace(/^(=+|\*+)\s*|\s*(=+|\*+)$/g, '')
            .replace(/\*+$/, '')
            .trim() + ' - BNNGPT'
        : 'BNNGPT - Search Anything Instantly',
    description:
      chat?.messages && chat.messages.length > 0
        ? chat.messages
            .filter(m => m.role === 'assistant')[0]
            ?.content.substring(90, 400)
            .replace(/\n/g, '')
            .replace(/\s\s+/g, ' ')
            .replace(/([*=\-]){2,}|^[*=\-]+|[*=\-]+$/g, '')
            .trim() + '....'
        : 'BNNGPT - Search Anything Instantly'
  }
}

export default async function SearchPage({ params }: SearchPageProps) {
  let userId
  const { userId: userid } = auth()
  if (!userid) {
    userId = 'anonymous'
  } else {
    userId = userid
  }
  const chat = await getChat(params.id)

  if (!chat) {
    redirect('/')
  }

  if (chat?.userId !== userId && chat?.userId !== 'anonymous') {
    notFound()
  }

  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages
      }}
    >
      <Chat id={params.id} />
    </AI>
  )
}
