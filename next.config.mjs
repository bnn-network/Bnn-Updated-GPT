/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: config => {
    config.resolve.fallback = { fs: false,http:false,url:false,https:false,zlib:false }

    return config
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
