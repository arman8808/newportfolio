/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'developers.elementor.com',
          port: '',
          pathname: '/**',
        },
        // Add other image hosts if needed
      ],
    },
  };
  
  module.exports = nextConfig;