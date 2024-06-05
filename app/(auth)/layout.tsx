import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  if (session?.user?.email) {
    redirect('/')
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  )
}

export default AuthLayout
