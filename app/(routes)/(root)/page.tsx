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
        <main className="flex-grow flex flex-col items-center justify-start md:justify-center px-4 py-8 md:py-16">
          <div className="w-full max-w-xl mx-auto flex flex-col items-center">
            <div className="w-full text-center mb-4 md:mb-8 mt-4 md:mt-0">
              <DynamicTypingEffect />
            </div>
            <div className="w-full mt-2 md:mt-8">
              <Chat id={id} />
            </div>
          </div>
        </main>
        <FooterAI />
      </div>
    </AI>
  )
}
