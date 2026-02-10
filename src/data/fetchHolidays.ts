export type Holidays = Record<string, string>

export async function fetchHolidays(): Promise<Holidays> {
  const res = await fetch("https://holidays-jp.github.io/api/v1/date.json");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
