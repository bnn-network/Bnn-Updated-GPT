import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/api/','/search/??????????','/share/']
    },
    sitemap: Array.from(
      { length: 12 },
      (_, i) => `${process.env.BASE_URL}/sitemap/${i}.xml`
    )
  }
}
