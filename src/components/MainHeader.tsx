"use client";

import { useEffect } from "react";
import { SITE_CONFIG } from "@/data/siteConfig";

type HeaderProps = {
  title?: string;
};

function MainHeader({ title }: HeaderProps) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE_CONFIG.title}`
      : SITE_CONFIG.title;
  }, [title]);

  return (
    <header>
      <div>
        <h1>
          {title && <>{title} | </>} <a href="/">{SITE_CONFIG.title}</a>
        </h1>
      </div>
    </header>
  );
}

export default MainHeader;
