import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";


globalStyle("html, body", {
  margin: 0,
  padding: 0,
  width: "100%",
  height: "100%",
});

globalStyle("#root", {
  minHeight: "100%",
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