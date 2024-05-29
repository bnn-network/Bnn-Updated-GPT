import { auth } from '@/auth'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import React from 'react'

const RoutesLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  return (
    <div>
      <Header />
      {session?.user?.email ? <Sidebar /> : null}
      {children}
      <Footer />
    </div>
  )
}

export default RoutesLayout
