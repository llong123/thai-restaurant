import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  //devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "peninsula.com",
      },
    ],
  },
};

export default nextConfig;
