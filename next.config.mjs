/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
