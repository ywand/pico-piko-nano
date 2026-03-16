import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    maximumFileSizeToCacheInBytes: 7 * 1024 * 1024,
    runtimeCaching: [
      {
        urlPattern: ({ request }: { request: Request }) =>
          request.destination === "document",
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 50,
          },
        },
      },
      {
        urlPattern: /^\/_next\/static\//,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "next-static",
        },
      },
      {
        urlPattern: ({ request }: { request: Request }) =>
          request.destination === "script" || request.destination === "style",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-resources",
        },
      },
      {
        urlPattern: ({ request }: { request: Request }) =>
          request.destination === "image",
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
