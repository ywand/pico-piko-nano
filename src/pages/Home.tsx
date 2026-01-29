import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};

function Home({ isDark, onToggleTheme }: Props) {

  return (
    <MainLayout
      title="Home"
      isDark={isDark}
      onToggleTheme={onToggleTheme}
    >
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="/G0001_kaboom_jump.html">カブーンでジャンプ</a></li>
          <li><a href="/T0001_memo.html">メモ帳</a></li>
          <li><a href="T0002_Speech.html">文章読み上げ</a></li>
        </ul>
      </nav>
    </MainLayout>
  )
}

export default Home;