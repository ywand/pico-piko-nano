import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { lightTheme, darkTheme } from './styles/theme.css.ts';
import App from './App.tsx'

//テーマの取得
const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const themeClass =
  saved === "dark" || (!saved && prefersDark)
    ? darkTheme
    : lightTheme;
document.documentElement.classList.add(themeClass);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
