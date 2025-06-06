/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 🚫 Disable strict mode (only if needed during dev)

  images: {
    domains: ['lh3.googleusercontent.com'],
  },

  webpack(config, { isServer }) {
    config.cache = {
      type: 'memory',
    };
    return config;
  },
};

export default nextConfig;
