import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Timer from "@/pages/Timer";

function App() {
  const [isDark, setIsDark] = useState(() => {
    console.log("theme1", localStorage.getItem("theme"));
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;

      localStorage.setItem("theme", next ? "dark" : "light");
      console.log("theme2", next ? "dark" : "light");

      return next;
    });
  };

  return (
    <Routes>
      <Route path="/"
        element={<Home isDark={isDark} onToggleTheme={toggleTheme} />}
      />
      <Route path="/Home"
        element={<Home isDark={isDark} onToggleTheme={toggleTheme} />}
      />
      <Route path="/timer"
        element={<Timer isDark={isDark} onToggleTheme={toggleTheme} />} />
    </Routes>
  );
}

export default App
