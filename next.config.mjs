/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.ee.ge',
        port: '',
        pathname: '/*/**',
      },
      {
        protocol: 'https',
        hostname: 'img.zoommer.ge',
        port: '',
        pathname: '/zoommer-images/thumbs/**',
      },
      {
        protocol: 'https',
        hostname: 'adashop.ge',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
