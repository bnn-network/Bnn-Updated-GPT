import React from 'react'
import { ModeToggle } from './mode-toggle'
import HistoryContainer from './history-container'
import ImageComponent from './image-component'
import LoginButton from './auth-button'

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full py-1 md:p-2 flex justify-between lg:pr-10 items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <ImageComponent />
      <div className="flex gap-0.5 z-10 pr-2 lg:pr-0">
        <ModeToggle />
        <LoginButton  />
        <HistoryContainer location="header" />
      </div>
    </header>
  )
}

export default Header
