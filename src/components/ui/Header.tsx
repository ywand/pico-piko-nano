import { useEffect } from "react";
import { SITE_CONFIG } from "@/data/siteConfig"

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
      <h1>{SITE_CONFIG.title}</h1>
    </header>
  );
}

export default Header;