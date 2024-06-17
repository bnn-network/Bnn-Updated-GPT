import React from 'react'
import HistoryContainer from './history-container'
import ImageComponent from './image-component'
import MenuButton from './MenuButton'


export const Header: React.FC = () => {
  return (
    <header className="fixed top-2 w-full  bg-secondary py-1 md:p-2 flex justify-between lg:pr-4 items-center  backdrop-blur md:backdrop-blur-none  md:bg-transparent">
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
