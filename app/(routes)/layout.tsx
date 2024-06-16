import Header from '@/components/header'
import { Sidebar } from '@/components/sidebar'

import React from 'react'
const RoutesLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      {children}
    </div>
  )
}

export default RoutesLayout
