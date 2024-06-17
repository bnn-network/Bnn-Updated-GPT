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
      topic: 'Breaking News',
      queries: [
        "What's the latest news in Gaza?",
        'Updates on the Russia-Ukraine Conflict',
        'Global Economic Impact on China-US Relations',
        'Climate Change and Natural Disasters Worldwide'
      ]
    },
    {
      topic: 'Finance and Business',
      queries: [
        `What is the current impact of the Feds interest rates?`,
        'Top Tech Companies to Watch in 2024',
        'Why is NVIDIA experiencing rapid growth?',
        'Current Trends in the Electric Vehicle Sector'
      ]
    },
    {
      topic: 'Technology and Innovation',
      queries: [
        "What's the latest in AI news?",
        'New Advancements in Space Exploration',
        'Top Trending Tech Gadgets for 2024',
        'Innovations in Renewable Energy'
      ]
    },
    {
      topic: 'Health and Wellness',
      queries: [
        'Newest Advancements in Mental Health Treatment',
        'Top Health and Wellness Trends for 2024',
        'Impact of AI on New Drug Research',
        'Current Research on Longevity and Anti-Aging'
      ]
    },
    {
      topic: 'Arts and Entertainment',
      queries: [
        'Upcoming Summer Blockbuster Movies',
        'Latest Celebrity News and Gossip',
        'What to Stream This Weekend?',
        'Top Trending TikTok Challenges'
      ]
    },
    {
      topic: 'LifeStyle and Fashion',
      queries: [
        'Top Travel Destinations for Summer 2024',
        'Latest Fashion Trends for June 2024',
        'Trending Home Decor Ideas',
        'Does Ozempic Work or is it a fad?'
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
