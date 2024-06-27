'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { AI, UIState } from '@/app/actions'
import { useUIState, useActions } from 'ai/rsc'
import { cn } from '@/lib/utils'
import { UserMessage } from './user-message'
import { Button } from './ui/button'
import { ArrowRight, Paperclip, Plus } from 'lucide-react'
import { EmptyScreen } from './empty-screen'
import Textarea from 'react-textarea-autosize'
import { nanoid } from 'ai'
import useModel from '@/store/useModel'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover'
import MyDropzone from './dropzone'

interface ChatPanelProps {
  messages: UIState
}

export function ChatPanel({ messages }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const [, setMessages] = useUIState<typeof AI>()
  const { submit } = useActions()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)
  const [shouldSubmit, setShouldSubmit] = useState(false)
  const router = useRouter()
  const params = useSearchParams()
  const [FileUpload, setFileUpload] = useState<File | null>(null) //for dropzone
  const { selectedModel } = useModel()

  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault()
      let formData
      let responseMessage: any
      // Add user message to UI state
      setMessages(currentMessages => [
        ...currentMessages,
        {
          id: nanoid(),
          component: <UserMessage message={input} />
        }
      ])

      // Submit and get response message
      if (!e) {
        responseMessage = await submit(null, selectedModel, false, input)
      } else {
        formData = new FormData(e?.currentTarget)
        responseMessage = await submit(formData, selectedModel)
      }

      setMessages(currentMessages => [...currentMessages, responseMessage])
    },
    [input, setMessages, submit, selectedModel]
  )

  useEffect(() => {
    if (params.get('prequery') !== null) {
      const input = params.get('prequery') as string
      setInput(input)
      setShouldSubmit(true)
    }
  }, [params])
  // Clear messages
  const handleClear = () => {
    window.location.replace('/')
  }
  useEffect(() => {
    if (shouldSubmit) {
      handleSubmit()
      setShouldSubmit(false)
    }
  }, [shouldSubmit, handleSubmit])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // If there are messages and the new button has not been pressed, display the new Button
  if (messages.length > 0) {
    return (
      <div className="fixed right-4 bottom-2  md:bottom-8 flex justify-center items-center mx-auto pointer-events-none">
        <Button
          type="button"
          variant={'secondary'}
          className="rounded-full bg-primary gap-2 text-secondary group hover:bg-primary transition-all hover:scale-105 pointer-events-auto"
          onClick={() => handleClear()}
        >
          <Plus size={18} />
          <span className="text-sm mr-2 animate-in fade-in duration-300">
            New chat
          </span>
        </Button>
      </div>
    )
  }

  return (
    <div
      className={
        'fixed overflow-y-auto left-0 right-0 top-10 mx-auto h-[80vh] lg:h-[88vh] flex flex-col items-center justify-center'
      }
    >
      <form onSubmit={handleSubmit} className="max-w-2xl w-full px-6">
        <div className="relative flex items-center w-full">
          <Textarea
            ref={inputRef}
            name="input"
            rows={1}
            maxRows={5}
            tabIndex={0}
            placeholder="Ask a question..."
            spellCheck={false}
            value={input}
            className="resize-none font-medium placeholder:select-none w-full min-h-12 rounded-full bg-muted dark:bg-primary-foreground pl-4 pr-10 pt-3.5 pb-1 text-sm border border-gray-200 dark:border-gray-700 placeholder:text-muted-foreground transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 dark:focus:ring-offset-0 dark:focus:border-transparent"
            onChange={e => {
              setInput(e.target.value)
              setShowEmptyScreen(e.target.value.length === 0)
            }}
            onKeyDown={e => {
              // Enter should submit the form
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                // Prevent the default action to avoid adding a new line
                if (input.trim().length === 0) {
                  e.preventDefault()
                  return
                }
                e.preventDefault()
                const textarea = e.target as HTMLTextAreaElement
                textarea.form?.requestSubmit()
              }
            }}
            onHeightChange={height => {
              // Ensure inputRef.current is defined
              if (!inputRef.current) return

              // The initial height and left padding is 70px and 2rem
              const initialHeight = 70
              // The initial border radius is 32px
              const initialBorder = 32
              // The height is incremented by multiples of 20px
              const multiple = (height - initialHeight) / 20

              // Decrease the border radius by 4px for each 20px height increase
              const newBorder = initialBorder - 4 * multiple
              // The lowest border radius will be 8px
              inputRef.current.style.borderRadius =
                Math.max(8, newBorder) + 'px'
            }}
            onFocus={() => setShowEmptyScreen(true)}
            onBlur={() => setShowEmptyScreen(false)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
                size={'icon'}
                variant={'ghost'}
              >
                <Paperclip size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="z-50 ml-60 mb-5   ">
              <MyDropzone FileUpload={FileUpload} setFileUpload={setFileUpload}  />
            </PopoverContent>
          </Popover>

          <Button
            type="submit"
            size={'icon'}
            variant={'ghost'}
            className="absolute right-2 top-1/2 transform rounded-full -translate-y-1/2"
            disabled={input.length === 0}
          >
            <ArrowRight size={20} />
          </Button>
        </div>
        <EmptyScreen
          submitMessage={message => {
            setInput(message)
          }}
          // className={cn(showEmptyScreen ? 'visible' : 'invisible')}
        />
      </form>
    </div>
  )
}
