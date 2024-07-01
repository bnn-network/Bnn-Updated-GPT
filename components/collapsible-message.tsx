'use client'

import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@radix-ui/react-collapsible'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'
import AnswerNavBar, { TabType } from './AnswerNavBar'
import MediaPage from './MediaPage'

interface CollapsibleMessageProps {
  message: {
    id: string
    isCollapsed?: StreamableValue<boolean>
    component: React.ReactNode
  }
  isLastMessage?: boolean
}

export const CollapsibleMessage: React.FC<CollapsibleMessageProps> = ({
  message,
  isLastMessage = false
}) => {
  const [data] = useStreamableValue(message.isCollapsed)
  const isCollapsed = data ?? false
  const [open, setOpen] = useState(isLastMessage)
  const [activeTab, setActiveTab] = useState<TabType>('Answer')

  useEffect(() => {
    setOpen(isLastMessage)
  }, [isCollapsed, isLastMessage])

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    console.log(`Tab changed to: ${tab}`)
  }
  if (!isCollapsed) {
    return message.component
  }

  return (
    <>
      <AnswerNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      <Collapsible
        open={open}
        onOpenChange={value => {
          setOpen(value)
        }}
        className=""
      >
        <CollapsibleTrigger asChild>
          <div className="w-full flex justify-end">
            <Button
              variant="ghost"
              size={'icon'}
              className={cn('-mt-3 rounded-full')}
            >
              <ChevronDown
                size={14}
                className={cn(
                  open ? 'rotate-180' : 'rotate-0',
                  'h-4 w-4 transition-all'
                )}
              />
              <span className="sr-only">collapse</span>
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {activeTab === 'Answer' && message.component}
          {activeTab === 'Media' && (
            <div>
              <MediaPage />
            </div>
          )}
          {activeTab === 'Sources' && <div>Sources content goes here</div>}
        </CollapsibleContent>
        {!open && <Separator className="my-2 bg-muted" />}
      </Collapsible>
    </>
  )
}
