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
    <footer className="w-full flex fixed bottom-0 right-0 p-4 z-50 bg-background/95 items-center">
      <div className="menu_header flex-1">
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:text-muted">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-muted">
              About Us
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-muted">
              Contact Us
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-muted">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="hover:text-muted">
              Terms & Conditions
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
