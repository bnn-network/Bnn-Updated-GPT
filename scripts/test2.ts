import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'
dotenv.config()

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string
})
async function clearAllChatsExceptAnonymous() {
  const pipeline = redis.pipeline()
  let cursor = 0
  let totalKeysProcessed = 0
  let totalChatsDeleted = 0
  let scanCount = 0

  try {
    do {
      scanCount++
      // Use SCAN command with Upstash Redis
      const response = await redis.scan(cursor, {
        match: 'user:chat:*',
        count: 1000
      })
      cursor = response[0]
      const keys = response[1]
      totalKeysProcessed += keys.length

      console.log(`Scan iteration: ${scanCount}`)
      console.log(`Cursor: ${cursor}`)
      console.log(`Keys found: ${keys.length}`)

      for (const key of keys) {
        const userId = key.split(':')[2]
        if (userId === 'anonymous') continue

        const chats: string[] = await redis.zrange(key, 0, -1)
        if (!chats.length) continue

        console.log(`Deleting chats for user: ${userId}`)
        for (const chat of chats) {
          pipeline.del(chat)
          pipeline.zrem(key, chat)
          totalChatsDeleted++
        }
      }
    } while (cursor !== 0)

    await pipeline.exec()

    console.log(`Total keys processed: ${totalKeysProcessed}`)
    console.log(`Total chats deleted: ${totalChatsDeleted}`)


  } catch (error) {
    console.error('An error occurred:', error)
  }
}
clearAllChatsExceptAnonymous()
