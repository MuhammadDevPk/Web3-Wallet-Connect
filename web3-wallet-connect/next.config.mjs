/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Suppress warnings from optional dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'pino-pretty': false,
    };
    config.externals.push('pino-pretty', '@react-native-async-storage/async-storage');
    return config;
  },
};

export default nextConfig;
