/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['d30ynstjdvogo0.cloudfront.net']
  },
  async rewrites() {
    return [
      {
        source: '/sitemaps/:filename*',
        destination: '/api/sitemaps/:filename*'
      }
    ]
  }
}

export default nextConfig
