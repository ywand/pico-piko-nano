import MainLayout from "@/components/layout/MainLayout";
import { useState, useEffect } from "react";
import { fetchHolidays } from "@/data/fetchHolidays";
import type { Holidays } from "@/data/fetchHolidays";

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

function T0005_Calendar({ isDark, onToggleTheme }: Props) {
  const [now, setNow] = useState(new Date());
  const [holidays, setHolidays] = useState<Holidays>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHolidays()
      .then(setHolidays)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  console.log(holidays);
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const strYMD =
    now.getFullYear() + "/" +
    (now.getMonth() + 1).toString().padStart(2, "0") + "/" +
    now.getDate().toString().padStart(2, "0") +
    "(" + days[now.getDay()] + ")";

  return (
    <MainLayout
      title="カレンダー"
      isDark={isDark}
      onToggleTheme={onToggleTheme}
    >
      <div>現在日付：{strYMD}</div>

      <ul>
        {Object.entries(holidays)
          .filter(([day]) =>
            day.startsWith(String(now.getFullYear()))
          )
          .map(([day, name]) => (
            <li key={day}>
              {day} : {name}
            </li>
          ))}
      </ul>

    </MainLayout >
  )
}

export default T0005_Calendar;