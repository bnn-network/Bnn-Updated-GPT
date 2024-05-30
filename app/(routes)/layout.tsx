
import Footer from '@/components/footer'
import Header from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import React from 'react'
export const dynamic = 'force-dynamic'
const RoutesLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </div>
  )
}

export default RoutesLayout
