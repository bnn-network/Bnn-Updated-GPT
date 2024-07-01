import { Chat } from '@/components/chat'
import { nanoid } from 'ai'
import { AI } from '../../actions'
import FooterAI from '@/components/ui/footerAi'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import LandingBG from '@/assets/icons/LandingBG.svg'
import HomePageBg from '@/assets/icons/homePageBg.svg'

const DynamicTypingEffect = dynamic(() => import('@/components/TypingEffect'), {
  ssr: false
})

export const runtime = 'edge'

export default function Page() {
  const id = nanoid()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <div>
        <div className="top-0">
          <Chat id={id} />
        </div>
      </div>
      <FooterAI />
      <div className="fixed bottom-0 w-full -z-10">
        {/* <Image src={HomePageBg} alt="landing background" /> */}
      </div>
    </AI>
  )
}
