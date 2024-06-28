'use client'

import { AI } from '@/app/actions'
import useModel from '@/store/useModel'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useActions, useUIState } from 'ai/rsc'
import React, { useState } from 'react'
import { UserMessage } from './user-message'
import { generateId } from 'ai'
import Image from 'next/image'

interface Props {
  name: string
  icon: string
}

function TrendingItem({ name, icon }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedModel } = useModel()
  const { submit } = useActions()
  const [, setMessages] = useUIState<typeof AI>()

  const handleDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const handleSubmit = async (query: string) => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: generateId(),
        component: <UserMessage message={query} />
      }
    ])
    const responseMessage = await submit(null, selectedModel, false, query)
    setMessages(currentMessages => [...currentMessages, responseMessage])
    setIsOpen(false)
  }

  const TopicQueries = [
    {
      topic: 'Breaking News',
      queries: [
        "What's the latest news in Gaza?",
        'Updates on the Russia-Ukraine Conflict',
        'Global Economic Impact on China-US Relations',
        'Climate Change and Natural Disasters Worldwide'
      ]
    },
    {
      topic: 'Finance',
      queries: [
        `Latest impact on Fed's interest rates`,
        'Top Tech Companies to Watch in 2024',
        'Why is NVIDIA experiencing rapid growth?',
        'Latest on Buy Now, Pay Later Regulation'
      ]
    },
    {
      topic: 'Technology',
      queries: [
        "What's the latest in AI news?",
        'How does Apple Intelligence work on iPhone?',
        'Top Trending Tech Gadgets for 2024',
        'New Advancements in Space Exploration'
      ]
    },
    {
      topic: 'Health',
      queries: [
        'Top Health and Wellness Trends for 2024',
        'New Advancements in Mental Health',
        'Impact of AI on Drug Research',
        'Current Research on Longevity and Anti-Aging'
      ]
    },
    {
      topic: 'Entertainment',
      queries: [
        "What's New to Stream This Weekend?",
        'Latest Celebrity News and Gossip',
        'Upcoming Summer Blockbuster Movies',
        'Top Trending TikTok Challenges'
      ]
    },
    {
      topic: 'LifeStyle',
      queries: [
        'Does Ozempic work or is it a fad?',
        'Top Travel Destinations for Summer 2024',
        'Latest Fashion Trends for June 2024',
        'Trending Home Decor Ideas'
      ]
    }
  ]

  const matchingTopic = TopicQueries.find(t => t.topic === name)

  return (
    <div className="relative mb-2">
      <button
        onClick={handleDropDown}
        className="w-full flex items-center justify-between p-2.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <Image
            src={icon}
            alt={name}
            width={16}
            height={16}
            className="text-muted-foreground"
          />
          <span className="text-xs font-medium">{name}</span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && matchingTopic && (
        <div className="mt-1 py-1 bg-background border border-border rounded-lg shadow-sm">
          {matchingTopic.queries.map((query, index) => (
            <button
              key={index}
              className="w-full text-left px-3 py-2 text-xs hover:bg-secondary/50 transition-colors duration-200"
              onClick={() => handleSubmit(query)}
            >
              {query}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TrendingItem
