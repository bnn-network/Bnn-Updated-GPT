import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.BASE_URL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${process.env.BASE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${process.env.BASE_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${process.env.BASE_URL}/privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${process.env.BASE_URL}/terms`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ]
}
