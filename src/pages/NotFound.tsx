import MainLayout from "../components/layout/MainLayout";

type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};

function NotFound({ isDark, onToggleTheme }: Props) {

  return (
    <MainLayout
      title="NotFound"
      isDark={isDark}
      onToggleTheme={onToggleTheme}
    >
      <div>404 Not Found</div>
      <div>ページが見つかりませんでした。</div>
    </MainLayout >
  )
}

export default NotFound;