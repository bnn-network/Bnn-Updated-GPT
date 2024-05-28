import React from 'react'
import Link from 'next/link'
import {
  SiDiscord,
  SiGithub,
  SiTwitter,
  SiInstagram,
  SiLinkedin,
  SiFacebook,
  SiX
} from 'react-icons/si'
import { Button } from './ui/button'

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex fixed bottom-0 right-0 p-4 z-50 bg-secondary text-primary border-top border-gray-600 items-center">
      <div className="menu_header flex-1 text-center min-w-[530px] ml-5">
        <ul className="flex space-x-6 m-0 p-0">
          <li className="list-none inline-block px-4">
            <a href="/" className="hover:text-muted-foreground font-light text-xs">
              Home
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a href="/about" className="hover:text-muted-foreground font-light text-xs">
              About
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a href="/privacy" className="hover:text-muted-foreground font-light text-xs">
              Privacy
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a href="/terms" className="hover:text-muted-foreground font-light text-xs">
              Terms
            </a>
          </li>
          <li className="list-none inline-block px-4">
            <a href="/contact" className="hover:text-muted-foreground font-light text-xs">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="flex space-x-4">
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
