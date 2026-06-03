import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/ProprietaryProducts',
        destination: '/proprietary-products',
        permanent: true,
      },
      {
        source: '/PartnerPlatforms',
        destination: '/partner-platforms',
        permanent: true,
      },
      {
        source: '/AboutUs',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/ContactUs',
        destination: '/contact-us',
        permanent: true,
      }
    ];
  },
  devIndicators: false,
}

export default nextConfig;
