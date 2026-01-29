import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    background: null,
    surface: null,
    text: null,
    textSub: null,
    border: null,
    primary: null,
  },
});

export const [lightTheme, lightVars] = createTheme({
  color: {
    background: "#FAFAFA",
    surface: "#FFFFFF",
    text: "#111827",
    textSub: "#6B7280",
    border: "#E5E7EB",
    primary: "#2563EB",

  },
});

export const [darkTheme, darkVars] = createTheme({
  color: {
    background: "#0B1220",
    surface: "#020617",
    text: "#E5E7EB",
    textSub: "#9CA3AF",
    border: "#1E293B",
    primary: "#60A5FA",
  },
});
