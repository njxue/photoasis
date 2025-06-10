/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cloudflare-b2.ngjxue.workers.dev",
      "photoasis.org",
      "res.cloudinary.com",
    ],
    unoptimized: false,
    minimumCacheTTL: 2678400,
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
