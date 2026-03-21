import MainLayout from "@/layouts/MainLayout";
import { createSEO } from "@/data/seo";
import { JsonLd } from "@/components/JsonLd";

const pageTitle = "FF14攻略情報";
const pageDescription =
  "ファイナルファンタジーXIV（FF14）に関する攻略情報まとめ。";
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
        <div>{pageDescription}</div>
      </MainLayout>
      <JsonLd data={seoData.structuredData} />
    </>
  );
}
