import type { NextConfig } from "next";
import dotenv from 'dotenv'

dotenv.config()

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds:true
  },
  images:{
    remotePatterns:[
      {
        hostname: new URL(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!).hostname
      }
    ]
  }
};

export default nextConfig;
