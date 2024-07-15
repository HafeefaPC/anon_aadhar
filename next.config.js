// next.config.js
const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
      config.resolve.fallback = {
        fs: false,
        readline: false,
      };
      return config;
    },
  };
  
  module.exports = nextConfig;
  