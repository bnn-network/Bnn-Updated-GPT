"use client";

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'

interface props {
    name: string,
    icon: string
}

function TrendingItem(topic: props) {

    const [isOpen, setIsOpen] = React.useState(false)

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    return (
        <div key={topic.name} className='p-3 rounded-xl bg-muted flex flex-col gap-4'>
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
                <button onClick={e => handleSubmit(e)}>
                    <ChevronDownIcon className='size-4 -rotate-90' />
                </button>
            </div>

            {/* trending searches */}
            {isOpen && (
                <div className='space-y-2 text-medium text-primary'>
                    <p>How the iPhone revolutionized the wireless industry?</p>
                    <p>How the iPhone revolutionized the wireless industry?</p>
                    <p>How the iPhone revolutionized the wireless industry?</p>
                    <p>How the iPhone revolutionized the wireless industry?</p>
                </div>
            )}

        </div>
    )
}

export default TrendingItem