import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const space = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
}

export const fontSize = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
}

export const color = {
  black: "#111111",
  darkgray: "#1A1A1A",
  gray: "#6B7280",
  white: "#F5F5F5",
  darkwhite: "#BDBDBD",
  lightBlue: "#93C5FD",
  blue: "#3B82F6",
  darkBlue: "#1E40AF",
  red: "#DC2626",
  lightyellow: "#FEF3C7",
}


globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("html", {
  backgroundColor: vars.color.background,
  fontSize: fontSize.md,
});

globalStyle("body", {
  fontFamily: `
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Hiragino Sans",
  "Hiragino Kaku Gothic ProN",
  "Noto Sans JP",
  "Segoe UI",
  "Meiryo",
  sans-serif
`,
  fontWeight: "normal",
  lineHeight: 1.6,
  letterSpacing: "0",

});

globalStyle("#root", {
  minHeight: "100%",
  margin: 0,
  padding: 0,
});

globalStyle(".bigFont", {
  fontSize: "50px",
  fontWeight: "bold",
});

globalStyle("main", {
  margin: `${space.sm} auto`,
  padding: `0 ${space.sm}`,
  width: "100%",
  maxWidth: "960px",
});

globalStyle("header, footer", {
  maxWidth: "960px",
  margin: "0 auto",
  padding: `0 ${space.sm}`,
});


globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: 0,
  padding: 0,
  fontSize: fontSize.lg,
  fontWeight: "bolder",
});

globalStyle("ul", {
  margin: `0 ${space.lg}`,
  padding: `0 0 ${space.md} 0`,
});


// 2. リンクの共通設定
globalStyle("a", {
  color: vars.color.link,
  textDecoration: "none",
});

// 3. リンクの各ステート（既読・ホバー）
globalStyle("a:visited", {
  color: vars.color.linkVisited,
});

globalStyle("a:hover", {
  color: vars.color.linkHover,
  textDecoration: "underline",
});

// 4. キーボード操作時のフォーカスリング（アクセシビリティ）
globalStyle("a:focus-visible", {
  outline: `2px solid ${vars.color.primary}`,
  outlineOffset: "2px",
  borderRadius: "4px",
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});