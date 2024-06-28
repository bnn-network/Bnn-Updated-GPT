/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bnngpt.com',
  generateRobotsTxt: true,
  exclude: ['/404', '/api/*', '/sitemaps/pages.xml'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://bnngpt.com/sitemaps/pages.xml']
  }
}
