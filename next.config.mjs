/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/individual-therapy",
        destination: "https://v0-madronelove-website.vercel.app/",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
