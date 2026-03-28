import { SITE_CONFIG } from "@/data/siteConfig";
import type { Metadata } from "next";

type Args = {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  type?: "website" | "webpage";
};

export function createSEO({
  title = "",
  description = SITE_CONFIG.description,
  keywords = [""],
  path = "",
  type = "webpage",
}: Args): {
  metadata: Metadata;
  structuredData: object;
} {
  const url = `${SITE_CONFIG.url}${path}`;
  const PageTitle =
    !title || title === SITE_CONFIG.title
      ? SITE_CONFIG.title
      : `${title} | ${SITE_CONFIG.title}`;

  const metadata: Metadata = {
    title: PageTitle,
    description,
    keywords: keywords,
    robots: "index, follow",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: PageTitle,
      description,
      url,
      siteName: SITE_CONFIG.title,
      images: [`${SITE_CONFIG.url}/og.png`],
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: PageTitle,
      description,
    },
    manifest: "/manifest.json",
  };

  let structuredData: object;
  if (type === "website") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_CONFIG.title,
      alternateName: SITE_CONFIG.alternateName,
      url: SITE_CONFIG.url,
    };
  } else {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: PageTitle,
      description,
      url,
    };
  }

  return { metadata, structuredData };
}
