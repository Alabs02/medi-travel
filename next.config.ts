import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const nextConfig: NextConfig = withBundleAnalyzer({
  output: "standalone",
  reactStrictMode: false,
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      "plus.unsplash.com",
      "res.cloudinary.com",
      "ui-avatars.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
        search: ""
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
        search: ""
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
        search: ""
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
        search: ""
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/**",
        search: ""
      }
    ],
    deviceSizes: [640, 750, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 128]
  },
  experimental: {
    cssChunking: true,
    webVitalsAttribution: ["CLS", "LCP"],
    turbo: {
      moduleIdStrategy: "deterministic",
      resolveAlias: {
        underscore: "lodash"
      },
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"]
    }
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  headers: async () =>
    process.env.NODE_ENV === "production"
      ? [
          {
            source: "/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable"
              },
              { key: "X-Content-Type-Options", value: "nosniff" },
              { key: "X-Frame-Options", value: "SAMEORIGIN" },
              {
                key: "Strict-Transport-Security",
                value: "max-age=31536000; includeSubDomains; preload"
              },
              { key: "X-XSS-Protection", value: "1; mode=block" },
              { key: "Referrer-Policy", value: "strict-origin" },
              {
                key: "Permissions-Policy",
                value: "geolocation=(), microphone=(), camera=()"
              },
              {
                key: "Content-Security-Policy",
                value:
                  "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:"
              }
            ]
          }
        ]
      : []
}) satisfies NextConfig;

export default nextConfig;
