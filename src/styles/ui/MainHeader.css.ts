import { style } from "@vanilla-extract/css";
import { space } from "@/styles/global.css";

export const wrapper = style({
  margin: `0 ${space.xs}`,
  padding: `0 ${space.xs}`,
  borderBottom: "1px solid #ccc",
});