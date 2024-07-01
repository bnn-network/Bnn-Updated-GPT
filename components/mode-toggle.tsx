'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { MoonIcon, SunIcon } from '@/assets/icons/icons'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const handleThemeSwitch = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }
  return (
    <DropdownMenuItem onClick={handleThemeSwitch}>
      <div className="flex w-full px-1 items-center gap-2 text-sm text-accent-foreground">
        <Image src={theme === 'light' ? SunIcon : MoonIcon} alt="light mode" />
        <button>Switch theme</button>
      </div>
    </DropdownMenuItem>
  )
}
