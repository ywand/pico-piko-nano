"use client";

import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export default function MainLayout({ title, children }: Props) {
  return (
    <div className="grid grid-cols-6 gap-0 w-full bg-gradient-to-b from-gray-950 to-black">
      <div className="hidden lg:block"></div>
      <div className="col-span-6 lg:col-start-2 lg:col-span-4">
        <MainHeader title={title} />
        <main>{children}</main>
        <MainFooter />
      </div>
    </div>
  );
}
