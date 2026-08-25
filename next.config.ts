import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false, // Désactive les indicateurs de développement
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;