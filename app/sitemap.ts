import { redis } from '@/lib/utils/redis'
import { MetadataRoute } from 'next'

type changeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 }
  ]
}

export default async function sitemap({
  id
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const changeFrequency: changeFrequency = 'daily'
  const changeFrequency2: changeFrequency = 'weekly'

  const start = id * 10000
  const end = start + 10000

  const pipeline = redis.pipeline()
  const chats: string[] = await redis.zrange(
    `user:chat:${'anonymous'}`,
    start,
    end - 1,
    {
      rev: true
    }
  )

  for (const chat of chats) {
    pipeline.hmget(chat, 'path', 'createdAt')
  }
  const searches: { path: string; createdAt: string }[] = await pipeline.exec()

  const searchesXml = searches.map(s => ({
    url: `${process.env.BASE_URL}${s.path}`,
    lastModified: s.createdAt,
    changeFrequency2
  }))

  const routes = ['/', '/about', '/contact', '/privacy', '/terms'].map(
    route => ({
      url: `${process.env.BASE_URL}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency
    })
  )

  return [...routes, ...searchesXml]
}
