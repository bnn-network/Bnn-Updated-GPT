import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/api/', '/search/??????????', '/share/']
    },
    sitemap: `${process.env.BASE_URL}/sitemap.xml`
  }
}
