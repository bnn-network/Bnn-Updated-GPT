'use client'
import React from 'react'
import Link from 'next/link'
import { SiInstagram, SiLinkedin, SiFacebook, SiX } from 'react-icons/si'
import { Button } from '@/components/ui/button'
import { useUIState } from 'ai/rsc'
import { AI } from '@/app/actions'

const FooterAI: React.FC = () => {
  const [messages, setMessages] = useUIState<typeof AI>()
  return (
    <footer
      className={`${messages.length > 0 ? 'hidden' : ''
        }  w-full flex fixed bottom-0 right-3 flex-col lg:flex-row lg:justify-between items-center p-4 z-50 bg-secondary text-primary border-0top border-gray-600`}
    >
      {/* useful links */}
      <div className="menu_header text-center ml-5">
        <ul className="flex text-muted-foreground font-medium text-xs justify-center md:space-x-0 m-0 p-0">
          <li className="list-none inline-block px-2">
            <a
              href="/"
              className=""
            >
              Home
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a
              href="/about"
            >
              About
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a
              href="/privacy"
            >
              Privacy
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a
              href="/terms"
            >
              Terms
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a
              href="/contact"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* social links */}
      <div className="flex flex-wrap justify-center space-x-0 text-muted-foreground">
        <Link href="https://x.com/epiphanyaitech" target="_blank">
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <SiX size={14} />
          </Button>
        </Link>
        <Link
          href="https://www.linkedin.com/company/epiphanyai/"
          target="_blank"
        >
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <SiLinkedin size={14} />
          </Button>
        </Link>
        <Link href="https://www.instagram.com/epiphanyaitech/" target="_blank">
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <SiInstagram size={14} />
          </Button>
        </Link>
        <Link href="https://www.facebook.com/epiphanyaicom" target="_blank">
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <SiFacebook size={14} />
          </Button>
        </Link>
      </div>

    </footer>
  )
}

export default FooterAI
