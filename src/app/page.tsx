import { LinkList } from "@/components/LinkList";
import MainLayout from "@/layouts/MainLayout";
import { createSEO } from "@/data/seo";
import { JsonLd } from "@/components/JsonLd";

const pageDescription =
  "ミニゲームよりも小さな自作ゲーム集。自作ツールの公開や、よく使うサイトのアンテナページ（リンク集）なども。";
const seoData = createSEO({
  title: "Pico-Piko-Nano",
  path: "/",
  description: pageDescription,
  type: "webpage",
});
export const metadata = seoData.metadata;

export const dynamic = "force-static";
export default function Home() {
  return (
    <>
      <MainLayout>
        <div>
          <p className="text-sm">{pageDescription}</p>
        </div>
        <div className="m-4">
          <nav>
            <LinkList />
          </nav>
        </div>
      </MainLayout>
      <JsonLd data={seoData.structuredData} />
    </>
  );
}
