import MainLayout from "@/layouts/MainLayout";
import Timer from "@/components/Timer";

export default function T0004_Timer() {
  return (
    <MainLayout title="Timer">
      <div className="text-5xl mt-4 mb-4">
        <Timer />
      </div>
    </MainLayout>
  );
}
