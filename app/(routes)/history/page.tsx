import React from 'react'
import Image from 'next/image'
import Bin from '@/assets/icons/bin.svg'
import { HistoryList } from '@/components/new-history-list'
// import { HistoryList } from '@/components/history-list'
import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  const { userId } = auth()

  return (
    <div className="bg-primary min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-lg font-medium mt-20 mb-10 text-center">History</h1>
      <HistoryList userId={userId ?? undefined} />
    </div>
  )
}
