/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'emergetools.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
