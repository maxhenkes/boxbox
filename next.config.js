/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  //TODO: remove after fixing types
  typescript: {
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    DATABASE_URL: process.env.DATABASE_URL, // Pass through env variables
  },
};

module.exports = nextConfig;
