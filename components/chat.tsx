'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChatPanel } from './chat-panel'
import { ChatMessages } from './chat-messages'
import { useUIState, useAIState } from 'ai/rsc'
import TrendingSearches from './TrendingSearches'

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

  // useEffect(() => {
  //   if (aiState.messages[aiState.messages.length - 1]?.type === 'followup') {
  //     // Refresh the page to chat history updates
  //     router.refresh()
  //   }
  // }, [aiState,router])

  return (
    <div className="px-8 sm:px-12 pt-0 md:pt-0 pb-14 md:pb-24 lg:max-w-3xl  lg:mx-auto mt-20  flex flex-col space-y-3 md:space-y-4 mb-15">
      <ChatMessages messages={messages} />
      <ChatPanel messages={messages} />
    </div>
  )
}
