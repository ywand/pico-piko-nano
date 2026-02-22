import type { ReactNode } from "react";
import { lightTheme, darkTheme } from "@/styles/theme.css";
import { container } from "@/styles/container.css";
import MainHeader from "../ui/MainHeader";
import { wrapper } from "@/styles/layout/GameLayout.css";

type Props = {
  title: string;
  isDark: boolean;
  children: ReactNode;
};

function GameLayout({ title, isDark, children }: Props) {
  return (
    <div className={`${isDark ? darkTheme : lightTheme} ${container} ${wrapper}`}    >
      <MainHeader
        title={title}
      />
      <main>
        {children}
      </main>
      <footer></footer>
    </div>
  );
}

export default GameLayout;