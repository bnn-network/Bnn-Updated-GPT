import React from 'react'
import { ChatShare } from './chat-share'

type UserMessageProps = {
  message: string
  chatId?: string
  showShare?: boolean
}

export const UserMessage: React.FC<UserMessageProps> = ({
  message,
  chatId,
  showShare = true
}) => {

  return (
    <div className="flex items-center w-full space-x-1 mt-2 min-h-10">
      <div className="text-xl flex-1 break-words w-full">{message}</div>
      {showShare && chatId && <ChatShare chatId={chatId} />}
    </div>
  )
}
