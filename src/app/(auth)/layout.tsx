import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Zap, BookOpen } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex bg-primary/5">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div>
            <Logo />
          </div>

          {/* Form */}
          {children}

          <div className="relative flex items-center justify-center text-sm">
            <span className="grow border-t border-muted" />
            <span className="grow text-center text-muted-foreground">
              Liên hệ hỗ trợ
            </span>
            <span className="grow border-t border-muted" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline">
              <svg viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                {" "}
                <path
                  d="M1168.737 487.897c44.672-41.401 113.824-36.889 118.9-36.663l289.354-.113 6.317-417.504L1539.65 22.9C1511.675 16.02 1426.053 0 1237.324 0 901.268 0 675.425 235.206 675.425 585.137v93.97H337v451.234h338.425V1920h451.234v-789.66h356.7l62.045-451.233H1126.66v-69.152c0-54.937 14.214-96.112 42.078-122.058"
                  fill-rule="evenodd"
                  className="fill-foreground"
                ></path>
              </svg>
              Facebook
            </Button>
            <Button variant="outline">
              <svg
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground"
              >
                <path d="M25.264 5.562v-0.769c-0.001-0.442-0.359-0.8-0.801-0.8h-16.639c-0.442 0-0.8 0.358-0.8 0.8v0.929c0 0.442 0.358 0.8 0.8 0.8h13.738l-14.885 19.418c-0.103 0.133-0.165 0.302-0.165 0.485 0 0 0 0.001 0 0.002v-0 0.768c0 0.442 0.358 0.8 0.8 0.801h17.119c0.442-0.001 0.8-0.359 0.801-0.801v-0.928c-0.001-0.442-0.359-0.8-0.801-0.801h-14.219l14.885-19.417c0.103-0.133 0.166-0.302 0.166-0.486v-0z"></path>{" "}
              </svg>
              Zalo
            </Button>
            <Button variant="outline">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground"
              >
                <path d="M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z"></path>
              </svg>
              Email
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Banner */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/80 to-secondary relative overflow-hidden items-center justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
              <Image src={"/logo.svg"} width={100} height={100} alt="Logo" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Hệ thống quản lý học tập
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-md">
              Theo dõi thời khóa biểu, lịch thi và quản lý học tập một cách hiệu
              quả
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Thời khóa biểu</h3>
                <p className="text-white/80 text-sm">
                  Xem lịch học chi tiết theo tuần
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Lịch thi</h3>
                <p className="text-white/80 text-sm">
                  Theo dõi lịch thi và phòng thi
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Cập nhật realtime</h3>
                <p className="text-white/80 text-sm">
                  Thông tin luôn được cập nhật
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Giao diện thân thiện</h3>
                <p className="text-white/80 text-sm">
                  Dễ sử dụng trên mọi thiết bị
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-1/2 -right-2/3 w-200 h-200 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-1/2 -left-2/3 w-200 h-200 bg-white/10 rounded-full"></div>
      </div>
    </div>
  );
}
