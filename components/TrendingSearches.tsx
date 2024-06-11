import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ChipIcon, GlobeIcon, GraphIcon, HealthIcon, MusicIcon, TravelIcon } from '@/assets/icons/icons'
import Image from 'next/image'


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
        <div className='flex gap-4 text-xs w-full'>

            <div className='w-full flex flex-col gap-4'>
                {trendingTopics.slice(0, 3).map(topic => (
                    <div key={topic.name} className='p-3 rounded-xl bg-muted'>
                        {/* header */}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={topic.icon}
                                    alt={topic.name}
                                />
                                <h2>
                                    {topic.name}
                                </h2>
                            </div>
                            <button>
                                <ChevronDownIcon className='size-4 -rotate-90' />
                            </button>
                        </div>
                    </div>
                ))}

            </div>


            <div className='w-full flex flex-col gap-4'>

                {trendingTopics.slice(3, 6).map(topic => (
                    <div key={topic.name} className='p-3 rounded-xl bg-muted'>
                        {/* header */}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={topic.icon}
                                    alt={topic.name}
                                />
                                <h2>
                                    {topic.name}
                                </h2>
                            </div>
                            <button>
                                <ChevronDownIcon className='size-4 -rotate-90' />
                            </button>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default TrendingSearches