import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '@/router/routes';

function App() {
  //テーマ切り替え
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      console.log('toggleTheme', next ? 'dark' : 'light');
      return next;
    });
  };

  //ページの呼び出し
  return (
    <Routes>
      {routes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={<Component isDark={isDark} onToggleTheme={toggleTheme} />}
        />
      ))}
    </Routes>
  );
}

export default App;
