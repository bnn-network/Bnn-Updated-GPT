'use client'

import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const phrases = [
  'Limitless Curiosity',
  'Ignite Your Curiosity',
  'Explore the Unknown',
  'Discover New Horizons',
  'Question Everything',
  'Seek Knowledge',
  'Embrace Wonder',
  'Unlock Secrets',
  'Expand Your Mind',
  'Journey into Discovery',
  'Fuel Your Imagination',
  'Challenge Assumptions',
  'Dive into Learning',
  'Unveil Hidden Truths',
  'Spark Inspiration',
  'Pursue Understanding',
  'Decode the World',
  'Broaden Perspectives',
  'Investigate the Unusual',
  'Ponder the Impossible',
  'Uncover Insights',
  'Probe the Depths',
  'Venture Beyond Limits',
  'Cultivate Wisdom',
  'Explore Possibilities',
  'Delve into Complexity',
  'Nurture Curiosity',
  'Illuminate the Unknown'
]

export default function TypingEffect() {
  return (
    <div className="w-full text-center">
      <h1 className="text-2xl font-semibold inline-block">
        <TypeAnimation
          sequence={phrases.flatMap(phrase => [
            phrase,
            2000, // wait 1.5s before deleting
            '' // delete the phrase
          ])}
          wrapper="span"
          speed={50}
          style={{ display: 'inline-block' }}
          repeat={Infinity}
        />
        <span className="animate-blink"></span>
      </h1>
    </div>
  )
}
