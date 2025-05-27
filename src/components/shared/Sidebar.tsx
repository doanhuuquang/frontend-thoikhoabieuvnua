import {
  Home,
  Calendar,
  GraduationCap,
  ChevronDown,
  ChevronsUpDown,
  Bell,
  BookCheck,
  Calculator,
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

import Image from "next/image";
import Link from "next/link";

import UserAvatar from "@/components/shared/UserAvatar";
import { UserData } from "@/data/UserData";

// Sidebar group items
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

const userName = UserData.name || "Người dùng";
const studentCode = UserData.studentCode || "Người dùng";

export function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Image alt="Logo" src="/logo.svg" width={35} height={35} />
                <div>
                  <p className="font-semibold">Vnua Calendar</p>
                  <p className="text-xs text-muted-foreground">
                    Thời khóa biểu Vnua
                  </p>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem className="lg:w-[14rem] md:w-[14rem] md w-[16rem]">
                <span>Acme Inc</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Acme Corp.</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

export function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup className="border-t-1">
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
                        <a
                          href={subItem.href}
                          key={subItem.label}
                          className="text-sm text-muted-foreground hover:text-foreground hover:bg-accent px-3 py-2 rounded-[5px] transition-colors"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}

export function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <UserAvatar className="w-10 h-10" />
                <div className="flex flex-col">
                  <span>{userName}</span>
                  <span className="text-accent-foreground/60 text-xs font-light">
                    {studentCode}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem className="lg:w-[14rem] md:w-[14rem] md w-[16rem]">
                <span>Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Thông tin cá nhân</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="bg-red-500/20 ">
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
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
