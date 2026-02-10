import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Timer from "@/pages/Timer";
import Calendar from "./pages/Calender";

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
        path="/Timer"
        element={<Timer isDark={isDark} onToggleTheme={toggleTheme} />}
      />
      <Route
        path="/Calender"
        element={<Calendar isDark={isDark} onToggleTheme={toggleTheme} />}
      />
    </Routes>
  );
}

export default App
