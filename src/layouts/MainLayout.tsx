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
      <header>{title}</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}

export default MainLayout;