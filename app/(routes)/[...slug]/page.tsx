import React, { } from 'react'
import { auth } from '@clerk/nextjs/server'
import { generateId } from 'ai'
import { Chat } from '@/components/chat'
import { AI } from '@/app/actions'

export const runtime = 'edge'

const SlugPage = async () => {
    const { userId } = auth()
    const id = generateId(userId ? 10 : 7)

    return (
        <AI
            initialAIState={{
                chatId: id,
                messages: []
            }}
        >
            <Chat id={id} />
        </AI>
    )
}

export default SlugPage