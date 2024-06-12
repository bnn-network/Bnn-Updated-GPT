import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { ChevronLeft, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { History as HistoryIcon } from 'lucide-react'
import { HistoryList } from './history-list'
import { Suspense } from 'react'
import { HistorySkeleton } from './history-skelton'
import { auth } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type HistoryProps = {
  location: 'sidebar' | 'header'
}

export async function History({ location }: HistoryProps) {
  const { userId } = auth()

  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn({
            'rounded-full z-10 text-foreground/30': location === 'sidebar'
          })}
        >
          {location === 'header' ? <Menu /> : <ChevronLeft size={18} />}
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="w-80 rounded-tl-xl rounded-bl-xl">
        <SheetHeader>
          <SheetTitle className="flex text-primary items-center gap-1 text-sm font-medium mb-2">
            <HistoryIcon size={16} />
            History
          </SheetTitle>
        </SheetHeader>
        <div className="my-2 h-full pb-12 md:pb-10">
          {userId ? (
            <Suspense fallback={<HistorySkeleton />}>
              <HistoryList userId={userId} />
            </Suspense>
          ) : (
            <div className="flex h-full items-center flex-col space-y-2 justify-center">
              <p className="text-sm animate-pulse">
                Authenticate to save your chat history..
              </p>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
