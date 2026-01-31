import type { ReactNode } from "react";
import { useEffect } from "react";
import { SITE_CONFIG } from "../config/site"
import { lightTheme, darkTheme } from "../styles/theme.css";
import { container } from "../styles/container.css";

type Props = {
  title?: string;
  isDark: boolean;
  onToggleTheme: () => void;
  children: ReactNode;
};

function MainLayout({ title, isDark, onToggleTheme, children }: Props) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE_CONFIG.title}`
      : SITE_CONFIG.title;
  }, [title]);

  return (
    <div className={`${isDark ? darkTheme : lightTheme} ${container}`}>
      <header>
        <h1>{SITE_CONFIG.title}</h1>
        <button onClick={onToggleTheme}>
          {isDark ? "🌞" : "🌛"}
        </button>
      </header>
      <main>{children}</main>
      <footer>コンテンツ作成中・・・。</footer>
    </div>
  );
}

export default MainLayout;