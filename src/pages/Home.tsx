import MainLayout from '../components/layout/MainLayout';
import { LinkList } from '../components/ui/LinkList';

type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};

function Home({ isDark, onToggleTheme }: Props) {
  return (
    <MainLayout title="Home" isDark={isDark} onToggleTheme={onToggleTheme}>
      自作ゲームと自作ツールの公開や、よく使うサイトへのリンク集の作成などをしています。
      <br />
      <br />
      <nav>
        <LinkList />
      </nav>
    </MainLayout>
  );
}

export default Home;
