import { Chat } from '@/components/chat'
import { nanoid } from 'ai'
import { AI } from '../../actions'
import FooterAI from '@/components/ui/footerAi'
import dynamic from 'next/dynamic'

const DynamicTypingEffect = dynamic(() => import('@/components/TypingEffect'), {
  ssr: false
})

export const runtime = 'edge'

export default function Page() {
  const id = nanoid()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <div className="flex flex-col min-h-screen bg-secondary text-primary">
        <main className="flex-grow flex flex-col items-center justify-start px-4 pt-32 sm:pt-20 md:pt-16 pb-8">
          <div className="w-full max-w-xl mx-auto flex flex-col items-center">
            <div className="mb-12 sm:mb-16">
              <DynamicTypingEffect />
            </div>
            <div className="w-full">
              <Chat id={id} />
            </div>
          </div>
        </main>
        <FooterAI />
      </div>
    </AI>
  )
}
