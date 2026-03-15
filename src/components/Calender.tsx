"use client";

import { useState, useMemo } from "react";

type CalenderCell = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
};
const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"];

function createCalendar(year: number, month: number): CalenderCell[][] {
  const firstDay = new Date(year, month, 1);
  const startWeekDay = firstDay.getDay();
  const startDate = new Date(year, month, 1 - startWeekDay);
  const matrix: CalenderCell[][] = [];
  const today = new Date();
  for (let row = 0; row < 6; row++) {
    const week: CalenderCell[] = [];
    for (let col = 0; col < 7; col++) {
      const date = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + row * 7 + col,
      );
      week.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
      });
    }
    matrix.push(week);
  }
  return matrix;
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const prevMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const calendar = useMemo(() => createCalendar(year, month), [year, month]);

  return (
    <div>
      <table className="border">
        <thead>
          <tr>
            <th colSpan={7} className="text-center border">
              <button onClick={prevMonth} className="border-0">
                ≪
              </button>
              <span>
                {year}年 {month + 1}月
              </span>
              <button onClick={nextMonth} className="border-0">
                ≫
              </button>
            </th>
          </tr>
          <tr>
            {WEEK_DAYS.map((day) => (
              <th key={day} className="text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, i) => {
            return (
              <tr key={i} className="border">
                {week.map((cell, j) => {
                  return (
                    <td
                      key={j}
                      className={`
                      "p-4 border "
                      ${cell.isToday ? "bg-blue-500 " : ""}
                       ${cell.isWeekend ? "text-red-500 " : ""}`}
                    >
                      <div className="text-2xl p-1 text-center">
                        {cell.isCurrentMonth ? cell.date.getDate() : "　"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
