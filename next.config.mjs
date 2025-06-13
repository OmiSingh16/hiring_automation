/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 🚫 Disable strict mode (only if needed during dev)
  eslint:{
    ignoreDuringBuilds:true,
  },

  images: {
    domains: ['lh3.googleusercontent.com'],
  },

  webpack(config, { isServer }) {
    config.cache = {
      type: 'memory',
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/api/(.*)", // Or "/(.*)" for all routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allow all (or restrict to "https://*.vapi.ai")
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
        ],
      },
    ];
  },

};


export default nextConfig;
