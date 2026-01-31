import MainLayout from "../layouts/MainLayout";
import { LinkList } from "../components/LinkList";

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
        <LinkList />
      </nav>
    </MainLayout >
  )
}

export default Home;