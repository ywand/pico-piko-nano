"use client";

import { useState, useEffect } from "react";
import { fetchHolidays } from "@/data/fetchHolidays";
import type { Holidays } from "@/data/fetchHolidays";

const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"];

export default function HolidayList() {
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

  return (
    <div>
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
  );
}
