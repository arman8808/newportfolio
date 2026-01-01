/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "developers.elementor.com",
        pathname: "/**",
      },
      // Add other image hosts if needed
    ],
  },
};

module.exports = nextConfig;
