import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pico-piko-nano.netlify.app"; // 自身のドメインに変更してください
  const lastModified = new Date();

  // 1. 静的なルートのリスト
  const routes = [
    "",
    "/antenna/AntennaFF14",
    "/antenna/AntennaGameNews",
    "/games/G0004_3DBallsGame",
    "/tools/T0004_Timer",
    "/tools/T0005_CalendarPage",
    "/tools/T0006_QrTool",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModified,
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8, // トップページを最優先にする
  }));
}
