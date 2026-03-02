import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import T0004_Timer from "@/pages/tool/T0004_Timer.tsx";
import T0005_CalendarPage from "./pages/tool/T0005_CalendarPage.tsx";
import T0006_QrTool from "./pages/tool/T0006_QrTool.tsx";
import G0004_3DBallsGame from "./pages/game/G0004_3DBallsGame.tsx";
import NotFoound from "./pages/NotFound.tsx";

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;

      localStorage.setItem("theme", next ? "dark" : "light");
      console.log("toggleTheme", next ? "dark" : "light");

      return next;
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home isDark={isDark} onToggleTheme={toggleTheme} />}
      />
      <Route
        path="/tool/T0004_Timer"
        element={<T0004_Timer isDark={isDark} onToggleTheme={toggleTheme} />}
      />
      <Route
        path="/tool/T0005_CalendarPage"
        element={<T0005_CalendarPage isDark={isDark} onToggleTheme={toggleTheme} />}
      />
      <Route
        path="/tool/T0006_QrTool"
        element={<T0006_QrTool isDark={isDark} onToggleTheme={toggleTheme} />}
      />
      <Route
        path="/game/G0004_3DBallsGame"
        element={<G0004_3DBallsGame isDark={isDark} />}
      />
      <Route
        path="*"
        element={<NotFoound isDark={isDark} onToggleTheme={toggleTheme} />}
      />
    </Routes>
  );
}

export default App
