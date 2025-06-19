"use client";

import SettingsSidebar from "@/components/shared/settings-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <h4 className="font-semibold text-lg py-5 border-b-1 px-3">Cài đặt</h4>
      <div className="flex p-1 gap-1 lg:flex-row lg:h-[calc(100vh-134px)] h-fit flex-col">
        <SettingsSidebar className="lg:w-[40%] w-[100%] p-2 bg-background dark:bg-accent rounded-lg" />
        <ScrollArea className="lg:w-[60%] w-[100%]">
          <div>{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
