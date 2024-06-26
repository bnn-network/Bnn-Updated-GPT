import React, { cache } from 'react'

import { Chat } from '@/lib/types'
import { getChats } from '@/lib/actions/chat'
import HistoryItem from './new-history-item'
import { ClearHistory } from './clear-history'

type HistoryListProps = {
  userId?: string
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId)
})

const groupChatsByDate = (chats: Chat[]) => {
  const grouped = chats.reduce((acc, chat) => {
    const date = new Date(chat.createdAt)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let title
    if (date.toDateString() === today.toDateString()) {
      title = 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      title = 'Yesterday'
    } else {
      title = '1 week ago' // You might want to adjust this logic based on actual dates
    }

    if (!acc[title]) {
      acc[title] = []
    }
    acc[title].push(chat)
    return acc
  }, {} as Record<string, Chat[]>)

  return Object.entries(grouped).map(([title, items]) => ({ title, items }))
}
export async function HistoryList({ userId }: HistoryListProps) {
  const chats = await loadChats(userId)

  return (
    <div className="flex flex-col flex-1 space-y-1 h-full">
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {!chats?.length ? (
          <div className="text-sm text-center py-4">No search history</div>
        ) : (
          chats?.map(
            (chat: Chat) => chat && <HistoryItem key={chat.id} chat={chat} />
          )
        )}
      </div>
      <div className="mt-auto">
        {chats?.length > 0 && <ClearHistory empty={!chats?.length} />}
      </div>
    </div>
  )
}
