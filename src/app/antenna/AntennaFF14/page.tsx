import AntennaList from "@/components/AntennaList";
import MainLayout from "@/layouts/MainLayout";

export default function AntennaFF14() {
  return (
    <MainLayout title="アンテナFF14">
      <p className="text-sm">FF14公式サイトやファンサイトの更新情報まとめ。</p>
      <div className="m-4">
        <nav>
          <AntennaList name="FF14" />
        </nav>
      </div>
    </MainLayout>
  );
}
