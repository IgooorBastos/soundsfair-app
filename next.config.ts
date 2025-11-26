import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone for better Netlify compatibility
  output: "standalone",

  // Disable static optimization for API routes to work on Netlify
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Use Webpack for production builds (more stable with Tailwind)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error on build
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

export default nextConfig;
