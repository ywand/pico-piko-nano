import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { createSEO } from "@/data/seo";

const seoData = createSEO({
  title: "Pico-Piko-Nano",
  type: "website",
});
export const metadata = seoData.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
        <GoogleAnalytics />
        <JsonLd data={seoData.structuredData} />
      </body>
    </html>
  );
}
