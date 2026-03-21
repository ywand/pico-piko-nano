"use client";

import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export default function GameLayout({ title, children }: Props) {
  return (
    <div className="grid grid-cols-6 gap-0 w-full min-h-screen">
      <div className="hidden lg:block"></div>
      <div className="col-span-6 lg:col-start-2 lg:col-span-4 flex flex-col h-screen">
        <MainHeader title={title} />
        <main className="flex-1 overflow-hidden">{children}</main>
        <div className="hidden">
          <MainFooter />
        </div>
      </div>
    </div>
  );
}
