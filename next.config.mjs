/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {},
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'imgnike-a.akamaihd.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.parallelstore.com',
      },
      {
        protocol: 'https',
        hostname: 'cquzhepiornqclvkywpe.supabase.co',
      },
    ],
  },
};

export default nextConfig;
