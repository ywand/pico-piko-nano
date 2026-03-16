import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pico-Piko-Nano",
  description: "自作ゲームや自作ツールの公開。よく使うページへのリンク集など。",
  openGraph: {
    title: "Pico-Piko-Nano",
    description:
      "自作ゲームや自作ツールの公開。よく使うページへのリンク集など。",
    url: "https://pico-piko-nano.netlify.app/",
    locale: "ja_JP",
    type: "website",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pico-Piko-Nano",
    alternateName: "ピコピコナノ",
    url: "https://pico-piko-nano.netlify.app/",
  };
  return (
    <html lang="ja">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
