import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;