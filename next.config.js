/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", process.env.CLOUDFLARE_URL],
    unoptimized: true,
  },
};

module.exports = nextConfig;
