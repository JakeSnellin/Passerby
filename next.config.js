const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        '@': path.resolve(__dirname),
      },
    };
    return config;
  },
  images: {
    domains: ['passerby-wp.local'],
  },
};

module.exports = nextConfig;
