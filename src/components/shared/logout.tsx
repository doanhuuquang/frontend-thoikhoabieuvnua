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
import { logout } from "@/utils/authUtils";

export default function LogoutButton() {
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
          className="w-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white flex justify-between"
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
