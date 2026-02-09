import { style, styleVariants } from "@vanilla-extract/css";

/**
 * ベーススタイル
 */
export const base = style({
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  cursor: "pointer",
});

/**
 * variant（役割）
 */
export const variant = styleVariants({
  primary: {
    background: "#2563eb",
    color: "#fff",
  },
  secondary: {
    background: "#e5e7eb",
    color: "#111",
  },
  ghost: {
    background: "transparent",
    color: "#2563eb",
  },
});

/**
 * size
 */
export const size = styleVariants({
  sm: {
    padding: "4px 8px",
    fontSize: 12,
  },
  md: {
    padding: "8px 16px",
    fontSize: 16,
  },
  lg: {
    padding: "12px 20px",
    fontSize: 20,
  },
});

/**
 * disabled
 */
export const disabled = style({
  opacity: 0.5,
  cursor: "not-allowed",
});
