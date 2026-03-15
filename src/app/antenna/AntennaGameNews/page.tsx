import AntennaList from "@/components/AntennaList";
import MainLayout from "@/layouts/MainLayout";

export default function AntennaGameNews() {
  return (
    <MainLayout title="アンテナGameNews">
      <p className="text-sm">ゲームサイトの更新情報まとめ。</p>
      <div className="m-2">
        <nav>
          <AntennaList name="GameNews" />
        </nav>
      </div>
    </MainLayout>
  );
}
