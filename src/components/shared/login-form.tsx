"use client";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  sudentCode: z.string().min(6, { message: "Mã sinh viên có ít nhất 6 ký tự" }),
  password: z.string().min(1, { message: "Mật khẩu không được để trống" }),
});

export default function LoginForm({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sudentCode: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch("https://thoikhoabieuvnua.up.railway.app/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Đăng nhập thất bại");
        const data = await res.json();
        // Xử lý thành công, ví dụ: lưu token, chuyển trang...
        console.log("Đăng nhập thành công:", data);
      })
      .catch((err) => {
        // Xử lý lỗi, ví dụ: hiển thị thông báo
        alert(err.message);
      });
  }

  return (
    <div
      className={cn(
        "w-full bg-background dark:bg-sidebar px-3 py-5 rounded-xl",
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="sudentCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã sinh viên</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập mã sinh viên của bạn"
                    {...field}
                    className="rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập mật khẩu tài khoản"
                    {...field}
                    className="rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full text-white rounded-xl mt-3" type="submit">
            Đăng nhập
          </Button>
        </form>
      </Form>
    </div>
  );
}
