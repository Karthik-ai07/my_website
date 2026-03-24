import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/my_website",
  assetPrefix: "/my_website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
