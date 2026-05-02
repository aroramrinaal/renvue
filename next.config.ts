import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: ['cdn.prod.website-files.com', 'xubs-akpz-sxip.n7.xano.io', 'cdn.prod.website-files.com', 'picsum.photos'],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
