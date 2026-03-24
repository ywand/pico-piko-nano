import MainLayout from "@/layouts/MainLayout";
import { Calendar } from "@/components/Calender";
import { Today } from "@/components/Today";
import HolidayList from "@/components/HolidayList";
import { createSEO } from "@/data/seo";
import { JsonLd } from "@/components/JsonLd";

const pageTitle = "カレンダー";
const pageDescription = "Reactコンポーネントによるカレンダーと祝日一覧。";
const seoData = createSEO({
  title: pageTitle,
  path: "/tools/T0005_Calendar",
  description: pageDescription,
  type: "webpage",
});
export const metadata = seoData.metadata;

export default function T0005_CalendarPage() {
  return (
    <>
      <MainLayout title={pageTitle}>
        <div>
          <h2 className="font-bold">
            現在日付：
            <Today />
          </h2>
        </div>
        <div className="m-2">
          <Calendar />
        </div>
        <hr />
        <div>
          <h2 className="font-bold">祝日一覧</h2>
          <div className="ml-2">
            <HolidayList />
          </div>
        </div>
      </MainLayout>
      <JsonLd data={seoData.structuredData} />
    </>
  );
}
