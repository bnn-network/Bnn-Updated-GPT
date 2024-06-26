'use client'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const TopBarItem = ({ href, title }: { href: string; title: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const selected = pathname === href

  return (
    <div className="cursor-pointer">
      {/* <h1 className="text-lg font-base mb-8 items-center">About Us</h1> */}
      <div
        className={`flex-row ${selected ? '' : 'text-text-secondary'} `}
        onClick={() => {
          router.push(href)
        }}
      >
        <div className="flex flex-row text-sm ">
          <div
            className={`font-base ${
              selected ? 'text-primary' : 'text-text-secondary'
            }`}
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBarItem
