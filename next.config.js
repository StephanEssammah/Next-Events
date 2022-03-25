/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "assets.website-files.com",
      "images.squarespace-cdn.com",
    ],
  },
};

module.exports = nextConfig;
