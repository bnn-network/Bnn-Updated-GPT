import { Chat } from '@/components/chat'
import { nanoid } from 'ai'
import { AI } from './actions'

export const maxDuration = 60

export default function Page() {
  const id = nanoid()
  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <div className="flex flex-col items-center min-h-screen justify-center bg-black text-white">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-2xl mb-8">Expand Your Genius</h1>{' '}
          {/* Adjusted the font size to text-2xl and margin bottom */}
          <div className="mt-8 w-full max-w-3xl">
            <Chat id={id} />
          </div>
        </main>
      </div>
    </AI>
  )
}
