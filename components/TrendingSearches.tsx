import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import {
  ChipIcon,
  GlobeIcon,
  GraphIcon,
  HealthIcon,
  MusicIcon,
  TravelIcon
} from '@/assets/icons/icons'
import TrendingItem from './TrendingItem'

const trendingTopics = [
  {
    name: 'Trade and Economic',
    icon: GraphIcon
  },
  {
    name: 'Politics and Diplomacy',
    icon: GlobeIcon
  },
  {
    name: 'Arts and Entertainment',
    icon: MusicIcon
  },

  {
    name: 'Health and Wellness',
    icon: HealthIcon
  },

  {
    name: 'Technology and Innovation',
    icon: ChipIcon
  },
  {
    name: 'Travel and Exploration',
    icon: TravelIcon
  }
]

function TrendingSearches() {
  return (
    <div className="absolute grid grid-cols-2 gap-4 text-xs w-full">
      <div className="flex flex-col gap-4">
        {trendingTopics.slice(0, 3).map(topic => (
          <TrendingItem key={topic.name} name={topic.name} icon={topic.icon} />
        ))}
      </div>

      <div className="flex flex-col gap-4  lg:space-y-0">
        {trendingTopics.slice(3, 6).map(topic => (
          <TrendingItem key={topic.name} name={topic.name} icon={topic.icon} />
        ))}
      </div>
    </div>
  )
}

export default TrendingSearches
