'use client'

import { AI } from '@/app/actions'
import useModel from '@/store/useModel'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useActions, useUIState } from 'ai/rsc'
import Image from 'next/image'
import React from 'react'
import { UserMessage } from './user-message'
import { nanoid } from 'ai'

interface props {
  name: string
  icon: string
}

function TrendingItem(topic: props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { selectedModel } = useModel()
  const { submit } = useActions()
  const [, setMessages] = useUIState<typeof AI>()

  const handleDropDown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const handleSubmit = async (query: string) => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        component: <UserMessage message={query} />
      }
    ])
    const responseMessage = await submit(null, selectedModel, false, query)

    setMessages(currentMessages => [...currentMessages, responseMessage])
  }

  const TopicQueries = [
    {
      topic: 'Trade and Economic',
      queries: [
        'What is the latest news in the stock market?',
        'What are the top 5 cryptocurrencies?',
        'What are the top 5 trading platforms?'
      ]
    },
    {
      topic: 'Politics and Diplomacy',
      queries: [
        'What is the latest political news?',
        'What are the recent diplomatic developments?',
        'What are the major political events happening?'
      ]
    },
    {
      topic: 'Technology and Innovation',
      queries: [
        "What's the latest in AI news?",
        'What are the recent technological advancements?',
        'What are the new innovations in the tech industry?'
      ]
    },
    {
      topic: 'Health and Wellness',
      queries: [
        'What are the latest health news?',
        'Why are avocados so expensive?',
        'What are the recent medical breakthroughs?'
      ]
    },
    {
      topic: 'Arts and Entertainment',
      queries: [
        'What are the latest entertainment news?',
        'New Taylor Swift album release?',
        'House of dragons release date?'
      ]
    },
    {
      topic: 'Travel and Exploration',
      queries: [
        'What are the latest travel destinations?',
        'Turkmensitan , the weirdest place on earth?',
        'Largest waterfall in the world?'
      ]
    }
  ]

  const matchingTopic = TopicQueries.find(t => t.topic === topic.name)

  return (
    <div
      key={topic.name}
      className="p-3 rounded-xl bg-muted flex flex-col gap-4 dark:bg-primary-foreground"
    >
      {/* header */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Image src={topic.icon} alt={topic.name} />
          <h2>{topic.name}</h2>
        </div>
        <button onClick={e => handleDropDown(e)}>
          <ChevronDownIcon className="size-4 -rotate-90" />
        </button>
      </div>

      {isOpen && matchingTopic && (
        <div className="space-y-2 text-medium text-primary">
          {matchingTopic.queries.map((query, index) => (
            <p
              className="cursor-pointer hover:animate-pulse transition hover:scale-110"
              key={index}
              onClick={() => handleSubmit(query)}
            >
              {query}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default TrendingItem
