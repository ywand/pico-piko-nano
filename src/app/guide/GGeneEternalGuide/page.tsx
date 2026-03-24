import MainLayout from "@/layouts/MainLayout";
import { createSEO } from "@/data/seo";
import { JsonLd } from "@/components/JsonLd";
import Text from "./text.mdx";

const pageTitle = "Gジェネエターナル攻略情報";
const pageDescription =
  "SDガンダム ジージェネレーション エターナル(Gジェネエターナル)に関するゲーム攻略情報まとめ。";
const seoData = createSEO({
  title: pageTitle,
  path: "/guide/GGeneEternalGuide",
  description: pageDescription,
  type: "webpage",
});
export const metadata = seoData.metadata;

export default function GGeneEternalGuide() {
  return (
    <>
      <MainLayout title={pageTitle}>
        <div>
          <p>{pageDescription}</p>
        </div>
        <div className="prose mx-auto p-2">
          <Text />
        </div>
      </MainLayout>
      <JsonLd data={seoData.structuredData} />
    </>
  );
}
