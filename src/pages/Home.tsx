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
        <section>
          <h2>メイン</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
          </ul>
        </section>
        <section>
          <h2>Game</h2>
          <ul>
            <li><a href="/G0001_kaboom_jump.html">カブーンでジャンプ</a></li>
          </ul>
        </section>
        <section>
          <h2>Tool</h2>
          <ul>
            <li><a href="/T0001_memo.html">メモ帳</a></li>
            <li><a href="T0002_Speech.html">文章読み上げ</a></li>
          </ul>
        </section>
        <section>
          <h2>（参考）外部サイト</h2>
          <ul>
            <li><a href="https://www.google.com/search?q=site:pico-piko-nano.netlify.app" target="_blank">Googleで検索</a></li>
            <li><a href="https://github.com/" target="_blank">github</a></li>
            <li><a href="https://www.netlify.com/" target="_blank">netlify</a></li>
            <li><a href="https://qiita.com/" target="_blank">qiita.com</a></li>
            <li><a href="https://chatgpt.com/" target="_blank">ChatGPT</a></li>
          </ul>
        </section>
      </nav>
    </MainLayout >
  )
}

export default Home;