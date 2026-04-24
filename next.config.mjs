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
      { source: "/individual-therapy", destination: "https://v0-madronelove-website.vercel.app/", permanent: true },
      { source: "/tests",              destination: "/neurodiversity",  permanent: true },
      { source: "/tests-blog",         destination: "/blog",            permanent: true },
      { source: "/adhd-asd-skills",    destination: "/adhd-skills",     permanent: true },
      { source: "/mindfulness-games",  destination: "/mindfulness",     permanent: true },
      { source: "/relationships",      destination: "/",                permanent: true },
      { source: "/grief-trauma",       destination: "/",                permanent: true },
      { source: "/depression-burnout", destination: "/",                permanent: true },
    ]
  },
}

export default nextConfig
