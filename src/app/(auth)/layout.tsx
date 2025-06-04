import React from "react";
import Logo from "@/components/shared/Logo";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="p-3 flex lg:flex-row flex-col w-full lg:justify-between justify-center items-center h-[100vh]">
      <div className="lg:w-[50%] lg:h-full flex lg:gap-0 gap-5 flex-col w-full lg:justify-between justify-center lg:items-start items-center">
        <Logo />
        <div className="lg:w-full lg:h-full w-fit flex items-center justify-center">
          {children}
        </div>
      </div>
      {/* Banner */}
      <div className="lg:w-[50%] lg:block hidden h-full rounded-2xl bg-amber-400">
        hehhe
      </div>
    </main>
  );
}
