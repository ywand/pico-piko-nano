import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";


globalStyle("html, body", {
  margin: 0,
  padding: 0,
  width: "100%",
  height: "100%",
  fontSize: "clamp(1rem, 1vw, 1rem)",
  fontFamily: `
    "Meiryo",
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    "Noto Sans JP",
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif
  `,
  lineHeight: 1.6,
  letterSpacing: "0",
});

globalStyle("#root", {
  minHeight: "100%",
  margin: 0,
  padding: 0,
});

globalStyle("header", {
  margin: 0,
  padding: 0,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: 0,
  padding: 0,
  fontSize: "clamp(1rem, 1vw, 1rem)"
});

globalStyle("ul", {
  margin: "0 clamp(1.5em, 1.5vw, 1.5rem)",
  padding: "0 0 clamp(0.5em, 0.5vw, 0.5rem) 0",
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