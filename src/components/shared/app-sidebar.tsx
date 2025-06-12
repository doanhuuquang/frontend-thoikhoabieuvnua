"use client";

import Link from "next/link";
import Logo from "@/components/shared/logo";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";

import {
  Home,
  Calendar,
  GraduationCap,
  ChevronDown,
  ChevronsUpDown,
  Bell,
  BookCheck,
  Calculator,
  Settings2,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const items = [
  {
    groupLabel: "Tiện ích",
    menuItems: [
      {
        label: "Thời khóa biểu",
        icon: Calendar,
        menuSubItems: [
          {
            label: "Xem lịch ngày hiện tại",
            href: "/schedule/today",
          },
          {
            label: "Xem lịch theo tuần",
            href: "/schedule/weekly",
          },
          {
            label: "Xem lịch theo tháng",
            href: "/schedule/monthly",
          },
        ],
      },
      {
        label: "Xem lịch thi",
        icon: BookCheck,
        href: "#",
        menuSubItems: [
          {
            label: "Lịch thi sắp tới",
            href: "#",
          },
          {
            label: "Tất cả lịch thi",
            href: "#",
          },
        ],
      },
      {
        label: "Xem điểm",
        icon: GraduationCap,
        href: "#",
        menuSubItems: [
          {
            label: "Học kỳ hiện tại",
            href: "#",
          },
          {
            label: "HK 2 - Năm học 2023-2024",
            href: "#",
          },
          {
            label: "HK 1 - Năm học 2023-2024",
            href: "#",
          },
        ],
      },
      {
        label: "Thông báo",
        icon: Bell,
        href: "#",
        menuSubItems: [
          {
            label: "Tất cả thông báo",
            href: "#",
          },
          {
            label: "Thông báo chưa đọc",
            href: "#",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "Trợ năng",
    menuItems: [
      {
        label: "Tính điểm tốt nghiệp",
        icon: Calculator,
        href: "#",
        menuSubItems: [
          {
            label: "Tính tự động",
            href: "#",
          },
          {
            label: "Nhập thông tin thủ công",
            href: "#",
          },
        ],
      },
    ],
  },
];

export function AppSidebarHeader() {
  return (
    <SidebarHeader className="border-b-1">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Logo />
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem className="lg:w-[14rem] md:w-[14rem] md w-[16rem]">
                <span>Thông tin ứng dụng</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Về chúng tôi</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

export function AppSidebarContent() {
  const pathName = usePathname();

  return (
    <SidebarContent>
      <SidebarGroup>
        <Link href="/" className="no-underline">
          <SidebarMenu>
            <SidebarMenuButton>
              <Home className="mr-2 h-4 w-4" />
              <span>Trang chủ</span>
            </SidebarMenuButton>
          </SidebarMenu>
        </Link>
      </SidebarGroup>
      {items.map((item) => (
        <SidebarGroup key={item.groupLabel} className="border-t-1">
          <SidebarGroupLabel>{item.groupLabel}</SidebarGroupLabel>
          <SidebarMenu>
            {item.menuItems.map((menuItem) => (
              <SidebarMenuItem key={menuItem.label}>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      {menuItem.icon && (
                        <menuItem.icon className="mr-2 h-4 w-4" />
                      )}
                      <span>{menuItem.label}</span>
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="border-l pl-4 ml-4">
                    <div className="flex flex-col gap-2 py-2">
                      {menuItem.menuSubItems.map((subItem) => (
                        <Link
                          key={subItem.href + subItem.label}
                          href={subItem.href}
                          className={
                            subItem.href === pathName
                              ? "text-foreground text-sm transition rounded-md p-2"
                              : "text-foreground/50 hover:bg-accent hover:text-foreground font-light text-sm transition rounded-md p-2"
                          }
                        >
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
      <SidebarGroup className="border-t-1">
        <Link href="/settings" className="no-underline">
          <SidebarMenu>
            <SidebarMenuButton>
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Cài đặt</span>
            </SidebarMenuButton>
          </SidebarMenu>
        </Link>
      </SidebarGroup>
    </SidebarContent>
  );
}

export function AppSidebarFooter() {
  const { user, loading } = useUser();
  const router = useRouter();

  return (
    <SidebarFooter className="border-t-1">
      <SidebarMenu>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-9 rounded-full bg-gray-300 dark:bg-accent" />
            <div className="space-y-2 grow-1">
              <Skeleton className="h-4 w-full bg-gray-300 dark:bg-accent" />
              <Skeleton className="h-3 w-[50%] bg-gray-300 dark:bg-accent" />
            </div>
          </div>
        ) : (
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => router.push("/profile")}>
              <Avatar className="mr-2 h-8 w-8">
                <AvatarFallback>
                  {user?.name.trim().split(" ").filter(Boolean).at(-1)?.[0] ||
                    "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{user?.name}</span>
                <span className="text-accent-foreground/60 text-xs font-light">
                  {user?.studentCode}
                </span>
              </div>
              <ChevronRight className="ml-auto h-4 w-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  );
}
