/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      "rukminim2.flixcart.com",
      "https://m.media-amazon.com/"
      // add any other domains you need
    ],
  },
} 

export default nextConfig
