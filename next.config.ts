import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // API ရဲ့ Base URL ကို သီးသန့် ခွဲထုတ်ယူပါမယ်
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6000';

    return [
      {
        source: '/api/:path*',
        // အမြဲတမ်း အနောက်မှာ /api/:path* ပါသွားအောင် တွဲပေးရပါမယ်
        destination: `${apiBaseUrl}/api/:path*`, 
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;