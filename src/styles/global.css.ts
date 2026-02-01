import { globalStyle } from "@vanilla-extract/css";

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  width: "100%",
  height: "100%",
});

globalStyle("#root", {
  minHeight: "100%",
});