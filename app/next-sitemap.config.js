// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://bnngpt.com', // Replace with your site URL
  generateRobotsTxt: true, // Generate a robots.txt file
  sitemapSize: 5000, // Maximum number of entries per sitemap file
  changefreq: 'daily', // Change frequency of the sitemap entries
  priority: 0.7, // Priority of the sitemap entries
  exclude: [
    '/admin/*', // Exclude admin routes
    '/login', // Exclude login page
    '/signup', // Exclude signup page
    '/terms', // Exclude terms and conditions page if needed
    '/privacy' // Exclude privacy policy page if needed
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [
      'https://bnngpt.com/sitemap.xml', // Primary sitemap
      'https://bnngpt.com/sitemaps/pages.xml' // Additional sitemap
    ],
    additionalEntries: [
      { userAgent: '*', disallow: '' },
      { host: 'https://bnngpt.com' }
    ]
  },
  transform: async (config, path) => {
    return {
      loc: path, // Use default path
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || []
    }
  }
}
