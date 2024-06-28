/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
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
