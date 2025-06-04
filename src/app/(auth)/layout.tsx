import React from "react";
import Logo from "@/components/shared/logo";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-accent dark:bg-background p-3 flex gap-3 lg:flex-row flex-col w-full lg:justify-between justify-center items-center h-[100vh]">
      <div className="lg:w-[50%] lg:h-full flex lg:gap-0 gap-5 flex-col w-full lg:justify-between justify-center lg:items-start items-center">
        <Logo />
        <div className="w-full lg:h-full flex items-center justify-center">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </div>
      {/* Banner */}
      <div className="lg:w-[50%] lg:block hidden h-full rounded-2xl bg-amber-400"></div>
    </main>
  );
}
