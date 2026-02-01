import { useState } from "react";
import { lightTheme, darkTheme } from "./styles/theme.css";
import Home from "./pages/Home";

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
    <div className={isDark ? darkTheme : lightTheme}>
      <Home
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App
