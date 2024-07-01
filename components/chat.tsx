'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChatPanel } from './chat-panel'
import { ChatMessages } from './chat-messages'
import { useUIState, useAIState } from 'ai/rsc'
type ChatProps = {
  id?: string
}

export function Chat({ id }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [messages] = useUIState()
  const [aiState] = useAIState()

  useEffect(() => {
    if (!path.includes('search') && messages.length === 1) {
      window.history.replaceState({}, '', `/search/${id}`)
    }
  }, [id, path, messages])

  return (
    <div className="px-8 sm:px-12 mt-14 mb-12 md:pb-24 max-w-3xl mx-auto flex flex-col space-y-3 md:space-y-4 bg-results-foreground p-4">
      <ChatMessages messages={messages} />
      <ChatPanel messages={messages} />
    </div>
  )
}
