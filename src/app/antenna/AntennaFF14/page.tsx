import AntennaList from "@/components/AntennaList";
import MainLayout from "@/layouts/MainLayout";
import { createSEO } from "@/data/seo";
import { JsonLd } from "@/components/JsonLd";

const pageTitle = "FF14アンテナ";
const pageDescription =
  "ファイナルファンタジーXIV（FF14）公式サイトやファンサイトの更新情報まとめ。各サイトのRSSから自動取得を行っています。";
const seoData = createSEO({
  title: pageTitle,
  path: "/guide/FF14Guide",
  description: pageDescription,
  type: "webpage",
});
export const metadata = seoData.metadata;

export default function AntennaFF14() {
  return (
    <>
      <MainLayout title={pageTitle}>
        <p>{pageDescription}</p>
        <div className="m-1">
          <nav>
            <AntennaList name="FF14" />
          </nav>
        </div>
      </MainLayout>
      <JsonLd data={seoData.structuredData} />
    </>
  );
}
