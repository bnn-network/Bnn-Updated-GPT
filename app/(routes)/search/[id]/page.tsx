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
      chat?.title.toString().slice(0, 50) ||
      'BNNGPT - Search Anything Instantly',
    description:
      chat?.description.toString().slice(0, 160) ||
      'Instantly search for anything you want to know about around the world'
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
    notFound();
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
