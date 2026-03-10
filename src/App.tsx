import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '@/router/routes';

function App() {
  //保存テーマ取得
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const saveTheme = localStorage.getItem('theme');
    if (saveTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  //テーマ切り替え
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
