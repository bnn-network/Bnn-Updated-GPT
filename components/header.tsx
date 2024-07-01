import React from 'react'
import HistoryContainer from './history-container'
import ImageComponent from './image-component'
import MenuButton from './MenuButton'
import HistoryIcon from '@/assets/icons/history.svg'
import Image from 'next/image'
import { ModeToggle } from './mode-toggle-header'

import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full  bg-secondary py-1 md:p-2 flex justify-between lg:pl-4 items-center  backdrop-blur  md:backdrop-blur-none  md:bg-transparent z-10">
      <ImageComponent />

      <div className="flex space-x-1 items-center z-10 pr-2 lg:pr-0">
        <Link href="/history">
          <Image
            src={HistoryIcon}
            alt="history image icon"
            className="w-5 h-5"
          />
        </Link>
        <ModeToggle />
        <MenuButton />
        <HistoryContainer location="header" />
      </div>
    </header>
  )
}

export default Header
