"use client";

import SettingsSidebar from "@/components/shared/settings-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft } from "lucide-react";
import React from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = React.useState(true);

  const handleSelectMenu = () => setShowSidebar(false);
  const handleBack = () => setShowSidebar(true);

  const isMobile = useIsMobile();

  return (
    <div className="max-w-7xl mx-auto">
      <h4 className="font-semibold text-lg py-5 border-b-1 px-3">Cài đặt</h4>
      <div className="flex gap-2">
        <div
          className={`${
            isMobile
              ? showSidebar
                ? "block w-full"
                : "hidden"
              : "w-[25%] lg:block md:block hidden"
          }`}
        >
          <SettingsSidebar
            className="w-full p-3"
            onSelectMenu={isMobile ? handleSelectMenu : undefined}
          />
        </div>
        <main
          className={`grow rounded-md ${
            isMobile && showSidebar ? "hidden" : ""
          }`}
        >
          {isMobile && (
            <div
              className="flex items-center gap-2 p-3 border-b-1 "
              onClick={handleBack}
            >
              <ChevronLeft className="p-0 border-1 rounded-full" />
              <span>Quay lại</span>
            </div>
          )}
          <div className="p-3">{children}</div>
        </main>
      </div>
    </div>
  );
}
