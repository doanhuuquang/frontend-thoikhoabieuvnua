"use client";

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
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { logout } from "@/utils/auth-utils";

export function LogoutButton() {
  const handleLogout = () => {
    logout();
    window.location.reload();
    toast.success("Thành công", {
      duration: 3000,
      position: "top-center",
      description: "Đã đăng xuất khỏi tài khoản",
      action: {
        label: "Ẩn thông báo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white flex justify-between"
        >
          <span>Chuyển đổi tài khoản</span>
          <LogOut />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Đăng xuất khỏi tài khoản này?</AlertDialogTitle>
          <AlertDialogDescription>
            Tất cả thông tin lịch học, thời khóa biểu, ghi chú... sẽ được xóa
            khỏi thiết bị này sau khi đăng xuất. Vẫn muốn tiếp tục?
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
  );
}

export default function SettingsLogout() {
  return (
    <div className="space-y-3 rounded-lg border bg-background/50 dark:bg-sidebar/50 backdrop-blur-2xl">
      <div className="w-full px-2 pt-3 pb-1.5 space-y-2">
        <h4 className="text-lg font-bold">Tài khoản</h4>
        <p className="text-sm text-muted-foreground">
          Mọi dữ liệu đã lưu sẽ được xóa và bạn sẽ được đăng xuất khỏi tài khoản
          của mình. Bạn sẽ cần đăng nhập lại để sử dụng ứng dụng.
        </p>
      </div>
      <div className="w-full h-[1px] bg-muted"></div>
      <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-1.5">
        <LogoutButton />
      </div>
    </div>
  );
}
