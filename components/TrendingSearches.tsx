import React from 'react'
import TrendingItem from './TrendingItem'

// Import your SVG icons
import GraphIcon from '@/assets/icons/graph.svg'
import GlobeIcon from '@/assets/icons/globe.svg'
import MusicIcon from '@/assets/icons/music.svg'
import HealthIcon from '@/assets/icons/health.svg'
import ChipIcon from '@/assets/icons/chip.svg'
import MoonIcon from '@/assets/icons/moon.svg'

const trendingTopics = [
  {
    name: 'Breaking News',
    icon: GraphIcon
  },
  {
    name: 'Finance',
    icon: GlobeIcon
  },
  {
    name: 'Entertainment',
    icon: MusicIcon
  },
  {
    name: 'Health',
    icon: HealthIcon
  },
  {
    name: 'Technology',
    icon: ChipIcon
  },
  {
    name: 'LifeStyle',
    icon: MoonIcon
  }
]

function TrendingSearches() {
  return (
    <div className="absolute grid grid-cols-2 gap-3 w-full max-w-2xl">
      <div className="flex flex-col gap-3">
        {trendingTopics.slice(0, 3).map(topic => (
          <TrendingItem
            key={topic.name}
            name={topic.name}
            icon={topic.icon.src} // Use .src for Next.js imported images
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {trendingTopics.slice(3, 6).map(topic => (
          <TrendingItem
            key={topic.name}
            name={topic.name}
            icon={topic.icon.src} // Use .src for Next.js imported images
          />
        ))}
      </div>
    </div>
  )
}

export default TrendingSearches
