import MainLayout from "@/layouts/MainLayout";
import { createSEO } from "@/data/seo";
import { JsonLd } from "@/components/JsonLd";
import Text from "./text.mdx";

const pageTitle = "FF14攻略情報";
const pageDescription =
  "ファイナルファンタジーXIV(FF14)に関するゲーム攻略情報まとめ。";
const seoData = createSEO({
  title: pageTitle,
  path: "/guide/FF14Guide",
  description: pageDescription,
  type: "webpage",
});
export const metadata = seoData.metadata;

export default function FF14Guide() {
  return (
    <>
      <MainLayout title={pageTitle}>
        <div>
          <p>{pageDescription}</p>
        </div>
        <div className="prose mx-auto mt-4 mb-4 p-2">
          <Text />
        </div>
      </MainLayout>
      <JsonLd data={seoData.structuredData} />
    </>
  );
}
