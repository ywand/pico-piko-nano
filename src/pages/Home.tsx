import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

function Home() {
  return (
    <MainLayout title="Home">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="/G0001_kaboom_jump.html">カブーンでジャンプ</a></li>
          <li><a href="/T0001_memo.html">メモ帳</a></li>
        </ul>
      </nav>
    </MainLayout>
  )
}

export default Home;