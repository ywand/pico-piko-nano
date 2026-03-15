import { LinkList } from "@/components/LinkList";
import MainLayout from "@/layouts/MainLayout";

export const dynamic = "force-static";
export default function Home() {
  return (
    <MainLayout>
      <p className="text-sm">
        自作ミニゲームやツールの公開。
        よく使うサイトへのリンク集の作成などをしています。
      </p>
      <div className="m-4">
        <nav>
          <LinkList />
        </nav>
      </div>
    </MainLayout>
  );
}
