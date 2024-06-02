import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
  },
  images: {
    domains: ['localhost','127.0.0.1'],
  },
};

export default nextConfig;