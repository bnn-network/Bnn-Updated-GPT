/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors: true
    },
    async rewrites() {
        return [
            {
                source: '/sitemaps/:filename*',
                destination: '/api/sitemaps/:filename*',
            },
        ];
    }
};

export default nextConfig;
