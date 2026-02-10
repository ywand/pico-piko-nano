import { useEffect } from "react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { headerStyle } from "@/styles/headerStyle"

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE_CONFIG.title}`
      : SITE_CONFIG.title;
  }, [title]);

  return (
    <header>
      <div className={headerStyle}>
        <h1>{title} | <a href="/">{SITE_CONFIG.title}</a></h1>
      </div>
    </header>
  );
}

export default Header;