import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    background: null,
    surface: null,
    text: null,
    textSub: null,
    border: null,
    primary: null,
    link: null,
    linkHover: null,
    linkVisited: null,
  },
});

//ライトモード
export const lightTheme = createTheme(vars, {
  color: {
    background: "#FAFAFA",
    surface: "#FFFFFF",
    text: "#111111",
    textSub: "#6B7280",
    border: "#E5E7EB",
    primary: "#60A5FA",
    link: "#1D4ED8",
    linkHover: "#60A5FA",
    linkVisited: "#1D4ED8",
  },
});

//ダークモード
export const darkTheme = createTheme(vars, {
  color: {
    background: "#111111",
    surface: "#1A1A1A",
    text: "#F5F5F5",
    textSub: "#6B7280",
    border: "#BDBDBD",
    primary: "#60A5FA",
    link: "#60A5FA",
    linkHover: "#1D4ED8",
    linkVisited: "#60A5FA",
  },
});

export const grayTheme = createTheme(vars, {
  color: {
    background: "#F5F5F5",  // 全体背景
    surface: "#BDBDBD",     // カード・テーブル
    text: "#111111",        // メイン文字
    textSub: "#666666",     // 補助文字
    border: "#BDBDBD",      // 枠線
    primary: "#111111",     // 通常ボタンなど（黒）
    link: "#666666",
    linkHover: "#FEE2E2",
    linkVisited: "#666666",
  },
});
