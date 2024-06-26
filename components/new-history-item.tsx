'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Bin from '@/assets/icons/bin.svg'
import { usePathname } from 'next/navigation'
import { Chat } from '@/lib/types'
import { cn } from '@/lib/utils'

type HistoryItemProps = {
  chat: Chat
}

const formatTime = (date: Date | string) => {
  const parsedDate = new Date(date)
  return parsedDate.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

const HistoryItem: React.FC<HistoryItemProps> = ({ chat }) => {
  const pathname = usePathname()
  const isActive = pathname === chat.path

  return (
    <Link
      href={chat.path}
      className={cn(
        'flex justify-between items-center cursor-pointer p-3 rounded-lg bg-results-foreground mb-1'
      )}
    >
      <div className="flex items-center space-x-6">
        <div className="text-sm text-text-secondary ">
          {formatTime(chat.createdAt)}
        </div>
        <div className="text-sm font-medium truncate select-none ">
          {chat.title}
        </div>
        <span className="text-text-secondary">→</span>
      </div>
      <button
        onClick={() => {}}
        className="text-text-secondary ml-2 cursor-pointer"
      >
        {' '}
        <Image src={Bin} height={15} alt="bin icon" />
      </button>
    </Link>
  )
}

export default HistoryItem
