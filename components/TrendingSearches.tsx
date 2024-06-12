import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ChipIcon, GlobeIcon, GraphIcon, HealthIcon, MusicIcon, TravelIcon } from '@/assets/icons/icons'
import Image from 'next/image'
import TrendingItem from './TrendingItem'


const trendingTopics = [{
    name: 'Trade and Economic',
    icon: GraphIcon
}, {
    name: 'Politics and Diplomacy',
    icon: GlobeIcon
}, {
    name: 'Technology and Innovation',
    icon: ChipIcon
}, {
    name: 'Health and Wellness',
    icon: HealthIcon
}, {
    name: 'Arts and Culture',
    icon: MusicIcon
}, {
    name: 'Travel and Tourism',
    icon: TravelIcon
},


]

function TrendingSearches() {
    return (
        <div className='absolute flex gap-4 text-xs w-full'>

            <div className='w-full flex flex-col gap-4'>
                {trendingTopics.slice(0, 3).map(topic => (
                    <TrendingItem key={topic.name} name={topic.name} icon={topic.icon} />
                ))}
            </div>


            <div className='w-full flex flex-col gap-4'>
                {trendingTopics.slice(3, 6).map(topic => (
                    <TrendingItem key={topic.name} name={topic.name} icon={topic.icon} />
                ))}
            </div>

        </div>
    )
}

export default TrendingSearches