import type { ReactNode } from "react";
import { useEffect } from "react";
import { SITE_CONFIG } from "../config/site"

type Props = {
  title?: string;
  children: ReactNode;
};

function MainLayout({ title, children }: Props) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE_CONFIG.title}`
      : SITE_CONFIG.title;
  }, [title]);

  return (
    <div>
      <header>{SITE_CONFIG.title}</header>
      <main>{children}</main>
      <footer>コンテンツ作成中・・・。</footer>
    </div>
  );
}

export default MainLayout;