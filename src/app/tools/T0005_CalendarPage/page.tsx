"use client";
import MainLayout from "@/layouts/MainLayout";
import { useState, useEffect } from "react";
import { fetchHolidays } from "@/data/fetchHolidays";
import type { Holidays } from "@/data/fetchHolidays";
import { Calendar } from "@/components/Calender";

const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"];

export default function T0005_CalendarPage() {
  const now = new Date();
  const [holidays, setHolidays] = useState<Holidays>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHolidays()
      .then(setHolidays)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  console.log(holidays);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const strYMD =
    now.getFullYear() +
    "/" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    now.getDate().toString().padStart(2, "0") +
    "(" +
    WEEK_DAYS[now.getDay()] +
    ")";

  return (
    <MainLayout title="カレンダー">
      <div>
        <h2>現在日付：{strYMD}</h2>
      </div>
      <hr />
      <div className="m-2">
        <Calendar />
      </div>
      <hr />
      <div>
        <h2>祝日一覧</h2>
        <ul>
          {Object.entries(holidays)
            .filter(([day]) => day.startsWith(String(now.getFullYear())))
            .map(([day, name]) => (
              <li key={day}>
                {day} : {name}
              </li>
            ))}
        </ul>
      </div>
    </MainLayout>
  );
}
