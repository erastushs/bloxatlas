import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.rbxcdn.com',
        port: '',
        search: '',
      },
    ],
  },
}

export default nextConfig
