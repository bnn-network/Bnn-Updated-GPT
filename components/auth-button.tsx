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
import { KeyRound, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { auth, currentUser } from '@clerk/nextjs/server'
import { SignOutButton } from '@clerk/nextjs'

const AuthButton = async () => {
  const { userId } = auth()
  const user = await currentUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-10" asChild>
        <Button variant="ghost" className="z-10" size={'icon'}>
          <User className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6 mb-2">
        <DropdownMenuLabel>
          {userId ? `Hi , ${user?.firstName}!` : 'Authentication'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {userId ? (
            <SignOutButton>
              <div className="flex w-full px-1 items-center">
                <LogOut className="w-4 h-4 mr-3" />
                <button type="submit">Logout</button>
              </div>
            </SignOutButton>
          ) : (
            <Link href={'/sign-in'} className="flex w-full px-1 items-center ">
              <KeyRound className="w-4 h-4   mr-3" />
              <h2 className="">Login</h2>
            </Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AuthButton
