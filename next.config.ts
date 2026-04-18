import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import withMDXInit from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const withMDX = withMDXInit({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug, // 1. 見出しにIDを付与
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend", // 見出しの前にリンクを配置
          properties: { className: ["anchor-link"] }, // CSSで装飾するためのクラス名
          content: {
            type: "element",
            tagName: "span",
            children: [{ type: "text", value: "# " }], // 表示される記号
          },
        },
      ],
    ],
  },
});

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    maximumFileSizeToCacheInBytes: 7 * 1024 * 1024,
    exclude: [
      ({ asset }) =>
        asset.name === "_redirects" || asset.name.endsWith("/_redirects"),
      /\/_redirects$/,
      "_redirects",
    ],
    runtimeCaching: [
      {
        urlPattern: ({ request }: { request: Request }) =>
          request.destination === "document",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "pages",
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
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/guide/FF14Guide", // 旧URL（ワイルドカード指定可）
        destination: "/guide/FF14", // 新URL
        permanent: true, // trueにすると301リダイレクト（恒久的な移動）になる
      },
      {
        source: "/guide/GGeneEternalGuide", // 旧URL（ワイルドカード指定可）
        destination: "/guide/GGeneEternal", // 新URL
        permanent: true, // trueにすると301リダイレクト（恒久的な移動）になる
      },
    ];
  },
};

export default withPWA(withMDX(nextConfig));
