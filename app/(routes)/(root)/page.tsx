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
      <div className="flex flex-col items-center min-h-screen justify-between bg-secondary text-primary px-4 py-8 md:py-16">
        <main className="flex flex-col items-center justify-center flex-1 w-full max-w-xl mx-auto">
          <DynamicTypingEffect />
          <div className="w-full mt-4 md:mt-8">
            <Chat id={id} />
          </div>
        </main>
        <FooterAI />
      </div>
    </AI>
  )
}
