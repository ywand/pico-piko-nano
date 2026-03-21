import AntennaList from "@/components/AntennaList";
import MainLayout from "@/layouts/MainLayout";
import { createSEO } from "@/data/seo";
import { JsonLd } from "@/components/JsonLd";

const pageTitle = "ゲームニュースアンテナ";
const pageDescription = "ゲームサイトの更新情報まとめ。";
const seoData = createSEO({
  title: pageTitle,
  path: "/guide/AntenaGameNews",
  description: pageDescription,
  type: "webpage",
});
export const metadata = seoData.metadata;

export default function AntennaGameNews() {
  return (
    <>
      <MainLayout title={pageTitle}>
        <div>
          <p>{pageDescription}</p>
        </div>
        <div className="mt-2 mb-2">
          <nav>
            <AntennaList name="GameNews" />
          </nav>
        </div>
      </MainLayout>
      <JsonLd data={seoData.structuredData} />
    </>
  );
}
