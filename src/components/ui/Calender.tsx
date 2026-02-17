import { useState, useMemo } from "react";
import * as styles from "@/styles/ui/Calender.css";

type CalenderCell = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}
const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土",];


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
        startDate.getDate() + row * 7 + col
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
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const calendar = useMemo(
    () => createCalendar(year, month),
    [year, month]
  );

  return (
    <div>
      <table className={styles.wraper}>
        <thead>
          <tr>
            <th colSpan={7} style={{ textAlign: "center", fontSize: "16px" }}>
              <button onClick={prevMonth} className={styles.button} >≪</button>
              <span>{year}年 {month + 1}月</span>
              <button onClick={nextMonth} className={styles.button} >≫</button>
            </th>
          </tr>
          <tr>
            {WEEK_DAYS.map(day => (
              <th key={day} style={{ textAlign: "center", fontSize: "16px" }}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, i) => {
            return (
              <tr key={i}>
                {week.map((cell, j) => {
                  return (
                    <td key={j} className={`
                      ${styles.cells} 
                      ${cell.isToday ? styles.today : ""}
                       ${cell.isWeekend ? styles.weekend : ""}`
                    }>
                      {cell.isCurrentMonth ? cell.date.getDate() : ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
