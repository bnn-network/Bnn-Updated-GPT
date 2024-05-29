"use client"
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { KeyRound, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

const LoginButton = () => {
    const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={'icon'}>
          <User className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6 mb-2">
        <DropdownMenuLabel>Authentication</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            onClick={() => {
              router.push('/login')
            }}
            type='button'
            className="flex w-full px-1 items-center "
          >
            <KeyRound className="w-4 h-4   mr-3" />
            <h2 className="">Login</h2>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LoginButton
