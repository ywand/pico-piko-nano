import MainLayout from '@/components/layout/MainLayout';
import AntennaList from '@/components/ui/AntennaList';

type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export default function AntennaPageFF14({ isDark, onToggleTheme }: Props) {
  return (
    <MainLayout
      title="アンテナページ【FF14】"
      isDark={isDark}
      onToggleTheme={onToggleTheme}
    >
      <AntennaList name="FF14" />
    </MainLayout>
  );
}
