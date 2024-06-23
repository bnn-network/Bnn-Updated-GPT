'use client'

import React, { useState, useEffect } from 'react'

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
  const [currentPhrase, setCurrentPhrase] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const getRandomPhrase = () => {
    let newPhrase
    do {
      newPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    } while (newPhrase === currentPhrase)
    return newPhrase
  }

  useEffect(() => {
    if (!currentPhrase) {
      setCurrentPhrase(getRandomPhrase())
    }

    const typingInterval = setInterval(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setCharIndex(charIndex + 1)
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(charIndex - 1)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setCurrentPhrase(getRandomPhrase())
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [charIndex, isDeleting, currentPhrase])

  return (
    <div className="w-full text-center">
      <h1 className="text-2xl font-semibold inline-block">
        {currentPhrase.substring(0, charIndex)}
        <span className="animate-blink">|</span>
      </h1>
    </div>
  )
}
