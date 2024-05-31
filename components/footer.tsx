'use client'
import React from 'react'
import Link from 'next/link'
import { SiInstagram, SiLinkedin, SiFacebook, SiX } from 'react-icons/si'
import { Button } from './ui/button'
import { useUIState } from 'ai/rsc'
import { AI } from '@/app/actions'

const Footer: React.FC = () => {
  const [messages, setMessages] = useUIState<typeof AI>()
  return (
    <footer className={`${messages.length>0?'hidden':""}  w-full  flex    fixed bottom-0 right-3  flex-col lg:flex-row lg:justify-between  p-4 z-50 bg-secondary text-primary border-0top border-gray-600 items-center`}>
      <div className="menu_header  text-center ml-5 mb-4">
        <ul className="flex  justify-center space-x-6 m-0 p-0">
          <li className="list-none inline-block px-4">
            <a
              href="/"
              className="hover:text-muted-foreground font-light text-xs"
            >
              Home
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a
              href="/about"
              className="hover:text-muted-foreground font-light text-xs"
            >
              About
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a
              href="/privacy"
              className="hover:text-muted-foreground font-light text-xs"
            >
              Privacy
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a
              href="/terms"
              className="hover:text-muted-foreground font-light text-xs"
            >
              Terms
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a
              href="/contact"
              className="hover:text-muted-foreground font-light text-xs"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap justify-center space-x-4">
        <Link href="https://x.com/epiphanyaitech" target="_blank">
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <SiX size={16} />
          </Button>
        </Link>
        <Link
          href="https://www.linkedin.com/company/epiphanyai/"
          target="_blank"
        >
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <SiLinkedin size={16} />
          </Button>
        </Link>
        <Link href="https://www.instagram.com/epiphanyaitech/" target="_blank">
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <SiInstagram size={16} />
          </Button>
        </Link>
        <Link href="https://www.facebook.com/epiphanyaicom" target="_blank">
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <SiFacebook size={16} />
          </Button>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
