import type { ReactNode } from "react";
import { lightTheme, darkTheme } from "@/styles/theme.css";
import { container } from "@/styles/container.css";
import Header from "../ui/Header";
import ThemeToggleButton from "../ui/ThemeToggleButton"


type Props = {
  title: string;
  isDark: boolean;
  onToggleTheme: () => void;
  children: ReactNode;
};

function MainLayout({ title, isDark, onToggleTheme, children }: Props) {
  return (
    <div className={`${isDark ? darkTheme : lightTheme} ${container}`}>
      <Header
        title={title}
      />
      <main>
        {children}
      </main>
      <ThemeToggleButton
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
      <footer></footer>
    </div>
  );
}

export default MainLayout;