// components/ClientHeader.tsx
'use client'

import { useTheme } from 'next-themes'
import React from 'react'

const ClientHeader = () => {
  const { theme } = useTheme()

  return (
    <header>
      <img
        src={
          theme === 'light'
            ? '/images/logo-black.png'
            : '/images/logo-white.png'
        }
        alt="Logo"
      />
    </header>
  )
}

export default ClientHeader
