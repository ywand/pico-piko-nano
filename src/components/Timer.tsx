"use client";

import { useState, useEffect } from "react";

const days = ["日", "月", "火", "水", "木", "金", "土"];

export default function Timer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 10);
    return () => clearInterval(timer);
  }, []);

  const strYMD =
    now.getFullYear() +
    "/" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    now.getDate().toString().padStart(2, "0") +
    "(" +
    days[now.getDay()] +
    ")";
  const strTime =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0") +
    ":" +
    now.getSeconds().toString().padStart(2, "0") +
    "." +
    now.getMilliseconds().toString().padStart(3, "0");

  return (
    <div className="suppressHydrationWarning">
      {strYMD} {strTime}
    </div>
  );
}
