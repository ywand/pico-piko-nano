import GameLayout from "@/layouts/GameLayout";
import { BabylonCanvas } from "@/components/BabylonCanvas";
import { createSEO } from "@/data/seo";
import { JsonLd } from "@/components/JsonLd";

const pageTitle = "3Dボールテスト";
const pageDescription = "Babylon.jsを用いた3Dゲームのテスト。";
const seoData = createSEO({
  title: pageTitle,
  path: "/games/G0004_3DBallsGame",
  description: pageDescription,
  type: "webpage",
});
export const metadata = seoData.metadata;

export default function G0004_3DBallsGame() {
  return (
    <>
      <GameLayout title={pageTitle}>
        <BabylonCanvas />
      </GameLayout>
      <JsonLd data={seoData.structuredData} />
    </>
  );
}
