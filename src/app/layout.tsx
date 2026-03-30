import "./globals.css";
import { FloatingScrollButton } from "@/components/FloatingScrollButton";
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
        <FloatingScrollButton />
        <GoogleAnalytics />
        <JsonLd data={seoData.structuredData} />
      </body>
    </html>
  );
}
