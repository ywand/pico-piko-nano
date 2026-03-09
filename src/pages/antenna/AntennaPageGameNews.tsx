import MainLayout from '@/components/layout/MainLayout';
import AntennaList from '@/components/ui/AntennaList';

type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export default function AntennaPageFF14({ isDark, onToggleTheme }: Props) {
  return (
    <MainLayout
      title="アンテナページ【GameNews】"
      isDark={isDark}
      onToggleTheme={onToggleTheme}
    >
      <div>
        ゲーム公式サイトやゲームニュースサイトの更新情報まとめ。
        <br />
        <br />
      </div>
      <AntennaList name="GameNews" />
    </MainLayout>
  );
}
