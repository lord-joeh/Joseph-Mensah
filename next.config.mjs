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
  // Preserve SPA redirect compatibility for legacy routes if needed
  async redirects() {
    return [];
  },
};

export default nextConfig;
