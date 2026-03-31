import { SITE_CONFIG } from "@/data/siteConfig";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
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
    "/guide/FF14Guide",
    "/guide/GGeneEternalGuide",
  ];

  const staticFiles = [
    "/games/G0001_kaboom_jump",
    "/games/G0002_blockbreaking",
    "/games/G0003_randomdraw",
    "/tools/T0001_memo",
    "/tools/T0002_Speech",
    "/tools/T0003_MarkDownEditor",
  ];

  // すべて結合
  const allRoutes = [...routes, ...staticFiles];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModified,
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8, // トップページを最優先にする
  }));
}
