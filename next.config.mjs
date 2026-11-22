/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xckruzkltbawoksfmtbr.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'mensah.dev-joseph.me',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  async rewrites() {
    const targetApi =
      process.env.BACKEND_API_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'https://api.dev-joseph.me/api';
    return [
      {
        source: '/api-backend/:path*',
        destination: `${targetApi}/:path*`,
      },
    ];
  },
};

export default nextConfig;
