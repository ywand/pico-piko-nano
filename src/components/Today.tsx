const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function Today() {
  const now = new Date();

  const strYMD =
    now.getFullYear() +
    "/" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    now.getDate().toString().padStart(2, "0") +
    "(" +
    WEEK_DAYS[now.getDay()] +
    ")";

  return <>{strYMD}</>;
}
