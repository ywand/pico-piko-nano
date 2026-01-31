import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
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
      globPatterns: ["**/*.{html,js,css,png,svg,ico}"],
      navigateFallback: "/index.html",
    },
  }),
  ]
})
