import { style } from "@vanilla-extract/css";
import { space, fontSize, color } from "@/styles/global.css";
import { vars } from "@/styles/theme.css"

export const wraper = style({
  margin: 0,
  padding: space.sm,
  border: `1px solid ${color.gray}`,
  borderCollapse: "collapse",
  fontSize: fontSize.lg,
});

export const cells = style({
  border: `1px solid ${color.gray}`,
  textAlign: "center",
  padding: `${space.xs} ${space.sm}`,
  height: space.lg,
  lineHeight: 1,
});

export const today = style({
  backgroundColor: color.blue,
  fontWeight: "bold",
});

export const weekend = style({
  color: color.red,
});

export const button = style({
  backgroundColor: vars.color.background,
  color: vars.color.text,
  margin: `0 ${space.md}`,
  border: `1px solid ${color.gray}`,
});
