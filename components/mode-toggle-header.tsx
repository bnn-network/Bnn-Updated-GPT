'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { MoonIcon, SunIcon } from '@/assets/icons/icons'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const handleThemeSwitch = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeSwitch}
      className="w-8 h-8"
    >
      <Image
        src={theme === 'light' ? SunIcon : MoonIcon}
        alt={theme === 'light' ? 'Light mode' : 'Dark mode'}
        width={20}
        height={20}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
