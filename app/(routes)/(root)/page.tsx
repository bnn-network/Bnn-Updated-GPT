import { Chat } from '@/components/chat'
import { nanoid } from 'ai'
import { AI } from '../../actions'
import FooterAI from '@/components/ui/footerAi'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DynamicTypingEffect = dynamic(() => import('@/components/TypingEffect'), {
  ssr: false
})

const StaticHeading = () => (
  <h1 className="text-3xl mb-10 lg:mb-16 font-semibold">Limitless Curiosity</h1>
)

export const runtime = 'edge'

export default function Page() {
  const id = nanoid()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <div className="flex items-center min-h-screen justify-center bg-secondary text-primary">
        <main className="flex flex-col items-center justify-center flex-1 px-2">
          <Suspense fallback={<StaticHeading />}>
            <DynamicTypingEffect />
          </Suspense>
          <div className="mt-8 w-full">
            <Chat id={id} />
            <FooterAI />
          </div>
        </main>
      </div>
    </AI>
  )
}
