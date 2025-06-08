"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ScanFace } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  studentCode: z
    .string()
    .min(6, { message: "Mã sinh viên có ít nhất 6 ký tự" }),
  password: z.string().min(1, { message: "Mật khẩu không được để trống" }),
});

export default function LoginForm({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentCode: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        const data = await res.json();
        // Đăng nhập thất bại
        if (!res.ok) {
          throw new Error(data.message || "Đăng nhập thất bại");
        }
        // Đăng nhập thành công
        // Lưu token vào localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Chuyển hướng về trang chủ
        window.location.href = "/";

        toast.success("Thành công", {
          duration: 3000,
          position: "top-center",
          description: "Đăng nhập thành công",
          icon: <ScanFace />,
          action: {
            label: "Ẩn thông báo",
            onClick: () => console.log("Undo"),
          },
        });
      })

      .catch((err) => {
        setError(err.message || "Đăng nhập thất bại");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div
      className={cn(
        "w-full bg-background dark:bg-sidebar px-3 py-5 rounded-md",
        className
      )}
    >
      {error && (
        <Alert variant="destructive" className="mb-3 bg-red-500/10 ">
          <AlertTitle>
            <span>Đăng nhập thất bại</span>
          </AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="studentCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã sinh viên</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập mã sinh viên của bạn"
                    {...field}
                    className="rounded-md"
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
                    type="password"
                    placeholder="Nhập mật khẩu tài khoản"
                    {...field}
                    className="rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full text-white rounded-md mt-3 relative"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : null}
            Đăng nhập
          </Button>
        </form>
      </Form>
    </div>
  );
}
