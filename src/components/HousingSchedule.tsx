import React from "react";

// スケジュールデータの型定義
type ScheduleCycle = {
  label: string;
  applyStart: string;
  applyEnd: string;
  resultsStart: string;
  resultsEnd: string;
  isCurrent?: boolean;
};

const HousingSchedule = () => {
  // 基準となるサイクルの開始日（例：パッチ7.2直後の火曜日など、既知の応募開始日）
  // ここでは 2026-03-31 を基準点として計算します
  const BASE_DATE = new Date("2026-03-31T00:00:00+09:00");
  const CYCLE_DAYS = 9;
  const APPLY_DURATION = 5; // 5日間
  const RESULTS_DURATION = 4; // 4日間

  // 現在時刻（検証用に特定の日時を固定する場合はここを書き換えてください）
  const now = new Date();

  // 基準日から現在までの経過日数を計算
  const diffTime = now.getTime() - BASE_DATE.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 現在のサイクルが基準から何番目か（負の数も考慮）
  const currentCycleIndex = Math.floor(diffDays / CYCLE_DAYS);

  const formatDate = (date: Date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const w = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
    return `${m}/${d} (${w})`;
  };

  const generateCycle = (index: number, label: string): ScheduleCycle => {
    const cycleStart = new Date(BASE_DATE);
    cycleStart.setDate(BASE_DATE.getDate() + index * CYCLE_DAYS);

    const applyEnd = new Date(cycleStart);
    applyEnd.setDate(cycleStart.getDate() + APPLY_DURATION - 1);

    const resultsStart = new Date(applyEnd);
    resultsStart.setDate(applyEnd.getDate() + 1);

    const resultsEnd = new Date(resultsStart);
    resultsEnd.setDate(resultsStart.getDate() + RESULTS_DURATION - 1);

    return {
      label,
      applyStart: formatDate(cycleStart),
      applyEnd: formatDate(applyEnd),
      resultsStart: formatDate(resultsStart),
      resultsEnd: formatDate(resultsEnd),
      isCurrent: index === currentCycleIndex,
    };
  };

  const schedules: ScheduleCycle[] = [
    generateCycle(currentCycleIndex - 1, "前回"),
    generateCycle(currentCycleIndex, "今回"),
    generateCycle(currentCycleIndex + 1, "次回"),
  ];

  return (
    <div className="w-full max-w-4xl overflow-x-auto">
      <table className="w-full border-collapse ">
        <thead>
          <tr className="text-sm">
            <th className="p-3 text-left border-b">期間区分</th>
            <th className="p-3 text-left border-b">応募期間 (5日間)</th>
            <th className="p-3 text-left border-b">結果発表・手続 (4日間)</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((item, index) => (
            <tr
              key={index}
              className={`border-b last:border-0 transition-colors ${
                item.isCurrent ? "bg-blue-50/50 dark:bg-blue-900/30" : ""
              }`}
            >
              <td
                className={`p-3 font-bold ${item.isCurrent ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-white"}`}
              >
                {item.label}
              </td>
              <td className="p-3 text-sm text-slate-600 dark:text-slate-300">
                {item.applyStart} 〜 {item.applyEnd}
              </td>
              <td className="p-3 text-sm text-slate-600 dark:text-slate-300">
                {item.resultsStart} 〜 {item.resultsEnd}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="m-0 p-0 text-right">
        ※ 公式のメンテナンス延長等によりズレが生じる場合があります。
      </p>
    </div>
  );
};

export default HousingSchedule;
