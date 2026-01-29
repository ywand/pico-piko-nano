import { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <Home
      isDark={isDark}
      onToggleTheme={() => {
        console.log("bf", isDark)
        setIsDark(v => !v)
      }}
    />
  );
}

export default App
