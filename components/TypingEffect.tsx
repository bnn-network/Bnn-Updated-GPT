'use client'

import React, { useState, useEffect } from 'react'

const phrases = [
  'Limitless Curiosity',
  'Unravel Mysteries',
  'Explore the Unknown',
  'Discover New Horizons',
  'Ignite Your Curiosity',
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
  'Satisfy Your Inquisitiveness',
  'Venture Beyond Limits',
  'Cultivate Wisdom',
  'Explore Possibilities',
  'Delve into Complexity',
  'Nurture Curiosity',
  'Illuminate the Unknown'
]

export default function TypingEffect() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (!isDeleting && charIndex < phrases[phraseIndex].length) {
        setCharIndex(charIndex + 1)
      } else if (!isDeleting && charIndex === phrases[phraseIndex].length) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(charIndex - 1)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setPhraseIndex((phraseIndex + 1) % phrases.length)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [charIndex, isDeleting, phraseIndex])

  return (
    <h1 className="text-3xl mb-10 lg:mb-16 font-semibold">
      {phrases[phraseIndex].substring(0, charIndex)}
      <span className="animate-blink">|</span>
    </h1>
  )
}
