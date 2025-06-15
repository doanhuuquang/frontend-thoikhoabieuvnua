import React from "react";
import Logo from "@/components/shared/logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="p-3 flex gap-3 lg:flex-row flex-col w-full lg:h-[100vh] h-fit lg:justify-between items-center ">
      <div className="lg:w-[50%] lg:h-full flex lg:gap-0 gap-5 flex-col w-full lg:justify-between justify-center lg:items-start items-center">
        <div className="w-full lg:h-full flex items-center justify-center">
          <div className="w-full max-w-[400px] bg-background dark:bg-sidebar grid space-y-5 border rounded-lg py-7 px-3">
            <Logo />
            {children}
          </div>
        </div>
      </div>
      {/* Banner */}
      <div className="lg:w-[50%] h-full rounded-2xl bg-linear-to-br from-secondary/60 to-secondary relative overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-between relative z-10">
          <div className="flex flex-col items-center gap-5 py-10 px-3">
            <Image alt="Logo" src={"/logo.svg"} width={50} height={50} />
            <p className="max-w-[400px] lg:text-2xl text-lg text-center font-semibold text-secondary-foreground">
              Lịch học và hơn thế nữa – tất cả trong một ứng dụng duy nhất
            </p>
            <p className="max-w-[440px] lg:text-lg text-sm text-center font-light text-secondary-foreground/70">
              Xem thời khóa biểu, ghi chú, nhắc nhở... dễ dàng và trực quan.
            </p>
          </div>
          {/* Mock up */}
          <Image
            alt="Mockup"
            src={"/assets/images/banner-mockup.svg"}
            width={0}
            height={0}
            className="w-full h-auto"
          />
        </div>
        <div className="w-[10000px] h-45 bg-linear-to-r from-secondary/20 to-secondary/5 absolute z-9 top-10 left-0 -translate-x-[50%] -translate-y-[50%] rotate-45"></div>
      </div>
    </main>
  );
}
