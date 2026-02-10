import { space, fontSize } from "@/styles/global.css";


type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};

function ThemeToggleButton({ isDark, onToggleTheme }: Props) {

  return (
    <button onClick={onToggleTheme}
      style={{
        position: "fixed",
        top: space.xs,
        right: space.xs,
        zIndex: 1000,
        border: 0,
        fontSize: fontSize.xl,
        backgroundColor: "transparent",
      }}
      aria-label="Toggle theme">
      {isDark ? "🌞" : "🌛"}
    </button>
  );
}

export default ThemeToggleButton;