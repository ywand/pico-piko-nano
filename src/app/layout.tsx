import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pico-Piko-Nano",
  description: "自作ゲームや自作ツールの公開。よく使うページへのリンク集など。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
