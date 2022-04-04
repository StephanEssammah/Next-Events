/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.website-files.com",
      "images.squarespace-cdn.com",
      "i.ibb.co",
    ],
  },
};

module.exports = nextConfig;
