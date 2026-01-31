import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const container = style({
  minHeight: "100vh",
  backgroundColor: vars.color.background,
  color: vars.color.text,
});