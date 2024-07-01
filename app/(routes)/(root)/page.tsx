import { Chat } from '@/components/chat'
import { generateId } from 'ai'
import { AI } from '../../actions'
import FooterAI from '@/components/ui/footerAi'
import dynamic from 'next/dynamic'
import { auth } from '@clerk/nextjs/server'

const DynamicTypingEffect = dynamic(() => import('@/components/TypingEffect'), {
  ssr: false
})

export async function generateMetadata() {
  return {
    title: 'BNNGPT - Discover. Explore. Search.',
    description: `Real-time, precise answers powered by advanced AI. Enjoy a sleek, beautiful interface. Experience the future of search with BNNGPT.`,
    metadataBase: new URL('https://www.bnngpt.com'),
    alternates: {
      canonical: "/"
    }
  }
}

export const runtime = 'edge'

export default async function Page() {
  const { userId } = auth()
  const id = generateId(userId ? 10 : 7)

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <div className="flex flex-col min-h-screen bg-secondary text-primary">
        <main className="flex-grow flex flex-col items-center justify-start md:justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-full text-center mb-4 md:mb-8 mt-32 md:mt-0">
              {' '}
              {/* Changed mt-20 to mt-32 */}
              <DynamicTypingEffect />
            </div>
            <div className="w-full mt-8 md:mt-12">
              <Chat id={id} />
            </div>
          </div>
        </main>
        <FooterAI />
      </div>
    </AI>
  )
}
