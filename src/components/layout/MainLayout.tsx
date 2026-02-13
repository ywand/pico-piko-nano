import type { ReactNode } from "react";
import { lightTheme, darkTheme } from "@/styles/theme.css";
import { container } from "@/styles/container.css";
import MainHeader from "../ui/MainHeader";
import MainFooter from "../ui/MainFooter";
import ThemeToggleButton from "../ui/ThemeToggleButton";

type Props = {
  title: string;
  isDark: boolean;
  onToggleTheme: () => void;
  children: ReactNode;
};

function MainLayout({ title, isDark, onToggleTheme, children }: Props) {
  return (
    <div className={`${isDark ? darkTheme : lightTheme} ${container}`}>
      <MainHeader
        title={title}
      />
      <main>
        {children}
      </main>
      <ThemeToggleButton
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
      <MainFooter />
    </div>
  );
}

export default MainLayout;