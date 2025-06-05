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
import {
  Loading,
  LoadingContent,
  LoadingOverlay,
} from "@/components/shared/loading";
import React from "react";

const formSchema = z.object({
  studentCode: z
    .string()
    .min(6, { message: "Mã sinh viên có ít nhất 6 ký tự" }),
  password: z.string().min(1, { message: "Mật khẩu không được để trống" }),
});

export default function LoginForm({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentCode: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    fetch("/api/auth-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          throw new Error(data.message || "Đăng nhập thất bại");
        }
        console.log("Đăng nhập thành công:", data);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div
      className={cn(
        "w-full bg-background dark:bg-sidebar px-3 py-5 rounded-xl",
        className
      )}
    >
      {isLoading && (
        <Loading>
          <LoadingOverlay />
          <LoadingContent>
            <p className="text-white">Đang kiểm tra thông tin...</p>
          </LoadingContent>
        </Loading>
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
