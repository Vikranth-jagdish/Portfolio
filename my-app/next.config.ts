import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
        pathname: '**',
      },
    ],
  },
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
