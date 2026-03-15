import { LinkList } from "@/components/LinkList";
import MainHeader from "@/components/MainHeader";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <MainHeader />
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            自作ミニゲームやツールの公開。
            よく使うサイトへのリンク集の作成などをしています。
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <nav>
            <LinkList />
          </nav>
        </div>
      </main>
    </div>
  );
}
