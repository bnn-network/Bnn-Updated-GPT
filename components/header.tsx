import React from 'react'
import { ModeToggle } from './mode-toggle'
import HistoryContainer from './history-container'
import ImageComponent from './image-component'
import LoginButton from './auth-button'
import MenuButton from './MenuButton'


export const Header: React.FC = () => {
  return (
    <header className="fixed w-full -z-10 bg-secondary py-1 md:p-2 flex justify-between lg:pr-4 items-center z-10 backdrop-blur md:backdrop-blur-none  md:bg-transparent">
      <ImageComponent />
      <div className="flex gap-0.5 z-10 pr-2 lg:pr-0">

        {/* <ModeToggle /> */}
        {/* <LoginButton /> */}

        <MenuButton />
        <HistoryContainer location="header" />
      </div>
    </header>
  )
}

export default Header
