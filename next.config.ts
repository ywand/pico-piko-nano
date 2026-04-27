import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import withMDXInit from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc"; // インポート済み
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/**
 * MDX設定: 見出しの自動リンク付与やGFMをサポート
 */
const withMDX = withMDXInit({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      // headingオプションで指定した名前の見出しを目次として扱う
      [remarkToc, { heading: "目次", tight: true, maxDepth: 3 }],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: { className: ["anchor-link"] },
          content: {
            type: "element",
            tagName: "span",
            children: [{ type: "text", value: "# " }],
          },
        },
      ],
    ],
  },
});

/**
 * PWA設定: Workboxを利用した高度なキャッシュ管理
 */
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: false,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  publicExcludes: ["!_redirects", "!_headers", "!robots.txt"],
  workboxOptions: {
    disableDevLogs: true,
    maximumFileSizeToCacheInBytes: 7 * 1024 * 1024,
    exclude: [
      /\/_next\/static\/.*(?:\.map)$/i, // source map除外
      /middleware-manifest\.json$/,
      // マニフェスト系をより広範に除外
      /build-manifest\.json$/,
      /_ssg-manifest\.json$/,
      /_buildManifest\.js$/,
      /_ssgManifest\.js$/,
      /precache-manifest\..*\.js$/,
      /server\/.*$/, // サーバーサイドのファイルを除外
      /_redirects$/,
    ],
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "next-data",
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60,
          },
        },
      },
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
      {
        urlPattern: ({ request }: { request: Request }) =>
          request.destination === "script" ||
          request.destination === "style" ||
          request.destination === "font",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-resources",
        },
      },
    ],
  },
});

/**
 * Next.js 基本設定
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/guide/FF14Guide",
        destination: "/guide/FF14",
        permanent: true,
      },
      {
        source: "/guide/GGeneEternalGuide",
        destination: "/guide/GGeneEternal",
        permanent: true,
      },
    ];
  },
};

export default withPWA(withMDX(nextConfig));
