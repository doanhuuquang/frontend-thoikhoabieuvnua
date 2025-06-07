"use client";

import Link from "next/link";
import Logo from "@/components/shared/logo";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { isLoggedIn } from "@/utils/authUtils";
import { UserData } from "@/data/UserData";
import { useRouter } from "next/navigation";

import {
  Home,
  Calendar,
  GraduationCap,
  ChevronDown,
  ChevronsUpDown,
  Bell,
  BookCheck,
  Calculator,
  LogOut,
  Loader2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.reload();
  };

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push("/login");
  };

  return (
    <SidebarFooter className="border-t-1">
      <SidebarMenu>
        {!loggedIn ? (
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="relative"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : null}
            Đăng nhập
          </Button>
        ) : (
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarFallback>
                      {userName.trim().split(" ").filter(Boolean).at(-1)?.[0] ||
                        "?"}
                    </AvatarFallback>
                  </Avatar>
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white flex justify-between"
                    >
                      <span>Đăng xuất</span>
                      <LogOut />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Đăng xuất khỏi tài khoản này?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tất cả thông tin lịch học, thời khóa biểu, ghi chú... sẽ
                        được xóa khỏi thiết bị này sau khi đăng xuất. Vẫn muốn
                        tiếp tục?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        Đăng xuất
                      </AlertDialogAction>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
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
