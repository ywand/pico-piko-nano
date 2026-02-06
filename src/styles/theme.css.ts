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
    text: "#111827",
    textSub: "#6B7280",
    border: "#E5E7EB",
    primary: "#2563EB",
    link: "#2563EB",
    linkHover: "#1D4ED8",
    linkVisited: "#7C3AED",
  },
});

//ダークモード
export const darkTheme = createTheme(vars, {
  color: {
    background: "#0B1220",
    surface: "#020617",
    text: "#E5E7EB",
    textSub: "#9CA3AF",
    border: "#1E293B",
    primary: "#60A5FA",
    link: "#60A5FA",
    linkHover: "#93C5FD",
    linkVisited: "#A78BFA",
  },
});
