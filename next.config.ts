import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/order-confirmation",
        destination: "/thank-you",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
