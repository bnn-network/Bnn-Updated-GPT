
import React from 'react'
import { ModeToggle } from './mode-toggle'
import HistoryContainer from './history-container'
import ImageComponent from './image-component'
import LoginButton from './login-button'

export const Header: React.FC = () => {

  
  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <ImageComponent />
      <div className="flex gap-0.5">
        <ModeToggle />
        <LoginButton/>
        <HistoryContainer location="header" />
      </div>
    </header>
  )
}

export default Header
