/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: config => {
    config.resolve.fallback = { fs: false,http:false,url:false,https:false }

    return config
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
