import SettingsSidebar from "@/components/shared/settings-sidebar";
import { ChevronLeft } from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" max-w-7xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl py-5 font-medium border-b-1 px-3">Cài đặt</h1>
      {/* Back button */}
      <div className="lg:hidden flex items-center gap-2 py-4 border-b-1 px-3">
        <ChevronLeft className="p-0" />
        <span>Cài đặt</span>
      </div>
      <div className="flex gap-2 ">
        <SettingsSidebar />
        <main className="p-3 grow">{children}</main>
      </div>
    </div>
  );
}
