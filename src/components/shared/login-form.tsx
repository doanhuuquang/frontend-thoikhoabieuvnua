"use client";
import Cookies from "js-cookie";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth, logout } from "@/utils/auth-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRight, EyeOff, EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useSchedule } from "@/hooks/use-schedule";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  fetchExamSchedulesFromAPI,
  fetchTimeTableSchedulesFromAPI,
} from "@/utils/schedule-utils";

const formSchema = z.object({
  studentCode: z
    .string()
    .min(6, { message: "Mã sinh viên có ít nhất 6 ký tự" }),
  password: z.string().min(1, { message: "Mật khẩu không được để trống" }),
});

export default function LoginForm({ className }: { className?: string }) {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const { setSchedulesLoading } = useSchedule();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentCode: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);

    try {
      await auth(values.studentCode, values.password);
      setSchedulesLoading(true);
      await fetchTimeTableSchedulesFromAPI(values.password);
      await fetchExamSchedulesFromAPI(values.password);
      window.location.reload();

      toast.success("Thành công", {
        duration: 3000,
        position: "top-center",
        description: "Đăng nhập thành công",
        action: {
          label: "Ẩn",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (err) {
      if (Cookies.get("token")) {
        await logout();
        window.location.reload();
      }

      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Đã xảy ra lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          {/* Error Alert */}
          {error && (
            <Alert
              variant="destructive"
              className="bg-red-500/10 border-red-200"
            >
              <AlertTitle>
                <span>Đăng nhập thất bại</span>
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="studentCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Mã sinh viên
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập mã sinh viên của bạn"
                        {...field}
                        className="h-12 border-gray-200 focus:border-[#00CF6A] focus:ring-[#00CF6A]/20 shadow-none"
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
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Mật khẩu
                      </FormLabel>
                      {/* Forgot Password Link */}
                      <Link
                        href={"https://daotao.vnua.edu.vn/#/forgetpass"}
                        className="text-sm text-[#00CF6A] hover:text-[#00CF6A]/80 font-medium "
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Nhập mật khẩu tài khoản"
                          {...field}
                          className="h-12 border-gray-200 focus:border-[#00CF6A] focus:ring-[#00CF6A]/20 shadow-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full h-12 bg-[#00CF6A] hover:bg-[#00CF6A]/90 text-white font-semibold group transition-all"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng nhập</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
