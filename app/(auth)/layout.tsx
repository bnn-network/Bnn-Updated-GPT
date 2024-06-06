import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth()
  if (userId) {
    redirect('/')
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  )
}

export default AuthLayout
