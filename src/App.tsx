import { useState } from "react";
import { lightTheme, darkTheme } from "./styles/theme.css";
import Home from "./pages/Home";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? darkTheme : lightTheme}>
      <Home
        isDark={isDark}
        onToggleTheme={() => {
          setIsDark(vars => !vars);
          if (isDark) {
            localStorage.setItem("theme", "dark");
          } else {
            localStorage.setItem("theme", "light");
          }
        }}
      />
    </div>
  );
}

export default App
