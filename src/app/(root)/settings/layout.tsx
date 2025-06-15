"use client";

import SettingsSidebar from "@/components/shared/settings-sidebar";
import React from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <h4 className="font-semibold text-lg py-5 border-b-1 px-3">Cài đặt</h4>
      <div className="gap-2 grid grid-cols-3">
        <SettingsSidebar className="p-3 lg:col-span-1 md:col-span-1 col-span-3" />
        <main className="lg:col-span-2 md:col-span-2 col-span-3 p-3">
          {children}
        </main>
      </div>
    </div>
  );
}
