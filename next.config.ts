import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Experimental optimizations for Next.js 15
  experimental: {
    // Optimize package imports - tree-shake Lucide React icons
    optimizePackageImports: ['lucide-react'],
  },

  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 1 year in production
    minimumCacheTTL: 31536000,
  },

  // Compression is enabled by default in Next.js 15
  // Configure powered by header removal (security best practice)
  poweredByHeader: false,

  // Cache control headers for static assets
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
