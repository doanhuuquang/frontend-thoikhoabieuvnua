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
  { title: "Dữ liệu ứng dụng", url: "/settings/app-data" },
];

export default function SettingsSidebar({ className }: { className?: string }) {
  const pathName = usePathname();

  return (
    <div className={cn("sticky top-[65px]", className)}>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className={
              item.url === pathName
                ? "text-foreground font-medium border-l-3 border-secondary bg-accent/20 rounded-md"
                : "text-foreground/50 hover:text-foreground"
            }
          >
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
