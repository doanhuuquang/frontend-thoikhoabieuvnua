import React from "react";
import Logo from "@/components/shared/logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-background dark:bg-sidebar p-3 flex gap-3 lg:flex-row flex-col w-full lg:justify-between justify-center items-center h-[100vh]">
      <div className="lg:w-[50%] lg:h-full flex lg:gap-0 gap-5 flex-col w-full lg:justify-between justify-center lg:items-start items-center">
        <div className="w-full lg:h-full flex items-center justify-center">
          <div className="w-full max-w-[400px] grid space-y-5">
            <Logo />
            {children}
          </div>
        </div>
      </div>
      {/* Banner */}
      <div className="lg:w-[50%] lg:flex hidden h-full py-10 px-3 rounded-2xl flex-col items-center justify-between bg-[url('/assets/images/banner-background-light.svg')] dark:bg-[url('/assets/images/banner-background-dark.svg')] bg-cover bg-no-repeat bg-center relative overflow-hidden">
        <div className="flex flex-col items-center gap-5">
          <Image
            alt="Logo"
            src={"/logo.svg"}
            width={50}
            height={50}
            className="border border-white/20 rounded-lg shadow-2xl"
          />
          <p className="max-w-[400px] text-[25px] text-center font-semibold text-[#2B2B2B] dark:text-white">
            Lịch học và hơn thế nữa – tất cả trong một ứng dụng duy nhất
          </p>
          <p className="max-w-[440px] text-[18px] text-center font-medium text-[#2B2B2B]/60 dark:text-white/60">
            Xem thời khóa biểu, ghi chú, nhắc nhở... dễ dàng và trực quan.
          </p>
        </div>
        {/* Mock up */}
        <div>
          <Image
            alt="Pc mockup"
            src={"/assets/images/banner-pc-mockup.svg"}
            width={800}
            height={1000}
            className="absolute bottom-0 left-0 translate-y-[0%] -translate-x-[20%]"
          />
          <Image
            alt="Pc mockup"
            src={"/assets/images/banner-iphone-mockup.svg"}
            width={250}
            height={500}
            className="absolute bottom-0 left-[70%] translate-y-[30%] -translate-x-[50%]"
          />
        </div>
      </div>
    </main>
  );
}
