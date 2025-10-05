/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@ai-ml.api/aimlapi-vercel-ai'],
  },
}

module.exports = nextConfig
