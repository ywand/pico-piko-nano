import { useEffect } from "react";
import { SITE_CONFIG } from "@/data/siteConfig";
import * as styles from "@/styles/MainHeader.css";

type HeaderProps = {
  title: string;
};

function MainHeader({ title }: HeaderProps) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE_CONFIG.title}`
      : SITE_CONFIG.title;
  }, [title]);

  return (
    <header>
      <div className={styles.wrapper}>
        <h1>{title} | <a href="/">{SITE_CONFIG.title}</a></h1>
      </div>
    </header>
  );
}

export default MainHeader;