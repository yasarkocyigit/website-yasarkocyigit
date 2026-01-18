import { withContentlayer } from "next-contentlayer";

const config = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withContentlayer(config);
