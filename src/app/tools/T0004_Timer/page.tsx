import MainLayout from "@/layouts/MainLayout";
import Timer from "@/components/Timer";
import { createSEO } from "@/data/seo";
import { JsonLd } from "@/components/JsonLd";

const pageTitle = "時計";
const pageDescription = "Reactコンポーネントによる時計。";
const seoData = createSEO({
  title: pageTitle,
  path: "/tools/T0004_Timer",
  description: pageDescription,
  type: "webpage",
});
export const metadata = seoData.metadata;

export default function T0004_Timer() {
  return (
    <>
      <MainLayout title={pageTitle}>
        <div className="text-5xl mt-4 mb-4">
          <Timer />
        </div>
      </MainLayout>
      <JsonLd data={seoData.structuredData} />
    </>
  );
}
