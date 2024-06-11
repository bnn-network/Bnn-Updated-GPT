import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { KeyRound, LogOut } from 'lucide-react'
import Link from 'next/link'
import { auth, currentUser } from '@clerk/nextjs/server'
import { SignOutButton } from '@clerk/nextjs'
import { Bars2Icon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { SunIcon, UserIcon } from '@/assets/icons/icons'


const MenuButton = async () => {
    const { userId } = auth()
    const user = await currentUser()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="z-10" asChild>
                <Button variant="ghost" className="z-10" size={'icon'}>
                    <Bars2Icon className='size-5' />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-6 mb-2 border-none min-w-52">
                <DropdownMenuItem>
                    <div className="flex w-full px-1 items-center gap-2 text-sm text-accent-foreground">
                        <Image src={SunIcon} alt='light mode' />
                        <button>Switch theme</button>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    {userId ? (
                        <SignOutButton>
                            <div className="flex w-full px-1 items-center gap-2 text-accent-foreground">
                                <Image src={UserIcon} alt='user account' />
                                <LogOut className="w-4 h-4 mr-3" />
                                <button type="submit">Logout</button>
                            </div>
                        </SignOutButton>
                    ) : (
                        <Link href={'/sign-in'} className="flex w-full px-1 items-center gap-2 text-accent-foreground">
                            <Image src={UserIcon} alt='user account' />
                            <h2 className="">Login</h2>
                        </Link>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MenuButton
