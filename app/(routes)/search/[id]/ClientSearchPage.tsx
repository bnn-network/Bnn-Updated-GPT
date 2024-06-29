'use client'
import { Chat } from '@/components/chat'
import { AI } from '@/app/actions'

interface ClientSearchPageProps {
  chat: any // Replace 'any' with the actual type of your chat object
}

export default function ClientSearchPage({ chat }: ClientSearchPageProps) {
  console.log('ClientSearchPage: Rendering with chat ID:', chat.id)
  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages
      }}
    >
      <Chat id={chat.id} />
    </AI>
  )
}
