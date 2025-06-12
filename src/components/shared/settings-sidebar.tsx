"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const items = [
  { title: "Cài đặt chung", url: "/settings" },
  { title: "Dữ liệu ứng dụng", url: "settings/schedule-settings" },
];

export default function SettingsSidebar({
  className,
  onSelectMenu,
}: {
  className?: string;
  onSelectMenu?: () => void;
}) {
  const pathName = usePathname();
  return (
    <div className={cn("sticky top-[65px]", className)}>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className={
              item.url === pathName
                ? "text-foreground font-medium"
                : "text-foreground/50 hover:text-foreground"
            }
          >
            <SidebarMenuButton asChild>
              <Link href={item.url} onClick={onSelectMenu}>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
