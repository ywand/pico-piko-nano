import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";
import sitemap from "vite-plugin-sitemap";
import path from "path";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://pico-piko-nano.netlify.app",
      exclude: [
        "/google",
      ],
    }),
    vanillaExtractPlugin(), // ← これ必須
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
      ],
      manifest: {
        name: "Pico-Piko-Nano",
        short_name: "Pico-Piko-Nano",
        start_url: "/",
        display: "standalone",
        background_color: "#FAFAFA",
        theme_color: "#FAFAFA",
        icons: [
          {
            src: "/assets/favicon-128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/assets/favicon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{html,js,css}"],
        navigateFallback: "/index.html",
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        runtimeCaching: [
          {
            // HTMLは必ず NetworkFirst
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
            },
          },
          // PNG / SVG / JPG などの画像
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1日
              },
            },
          },
        ],
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
