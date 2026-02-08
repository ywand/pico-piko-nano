import MainLayout from "../components/layout/MainLayout";
import { useState, useEffect } from "react";

type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};

const days = [
  "日",
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
];

function Timer({ isDark, onToggleTheme }: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 10);
    return () => clearInterval(timer);
  }, []);

  const strYMD =
    now.getFullYear() + "/" +
    (now.getMonth() + 1).toString().padStart(2, "0") + "/" +
    now.getDate().toString().padStart(2, "0") +
    "(" + days[now.getDay()] + ")";
  const strTime =
    now.getHours().toString().padStart(2, "0") + ":" +
    now.getMinutes().toString().padStart(2, "0") + ":" +
    now.getSeconds().toString().padStart(2, "0") + "." +
    now.getMilliseconds().toString().padStart(3, "0");

  return (
    <MainLayout
      title="Timer"
      isDark={isDark}
      onToggleTheme={onToggleTheme}
    >
      <div className="bigFont">{strYMD} {strTime}</div>
    </MainLayout >
  )
}

export default Timer;