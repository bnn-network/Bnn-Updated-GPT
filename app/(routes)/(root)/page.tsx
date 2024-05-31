import { Chat } from '@/components/chat'
import { nanoid } from 'ai'
import { AI } from '../../actions'
import Footer from '@/components/footer'

export const maxDuration = 60

export default async function Page() {
  const id = nanoid()
  return (
    <>
      <AI initialAIState={{ chatId: id, messages: [] }}>
        <div className="flex  items-center -z-10 min-h-screen justify-center bg-secondary text-primary">
          <main className="flex flex-col items-center justify-center flex-1 px-2 ">
            <h1 className="text-2xl mb-8">Expand Your Genius</h1>{' '}
            <div className="mt-8 w-full  ">
              <Chat id={id} />
              <Footer />
            </div>
          </main>
        </div>
    
      </AI>
    </>
  )
}
