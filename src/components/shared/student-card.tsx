"use client";

import UserAvatar from "@/components/shared/user-avatar";
import { useUser } from "@/hooks/use-user";
import Image from "next/image";
import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function StudentCardHeader() {
  return (
    <div className="p-3 bg-[#007A48] text-white flex gap-2 items-center justify-between">
      <Image
        src={"/assets/images/logos/vnua-logo.svg"}
        alt="Vnua logo"
        width={50}
        height={50}
      />
      <div className="space-y-1 text-end">
        <p className="uppercase text-sm">HỌC VIỆN NÔNG NGHIỆP VIỆT NAM</p>
        <p className="uppercase text-[10px]">
          VIETNAM NATIONAL UNIVERSITY OF AGRICULTURE
        </p>
      </div>
    </div>
  );
}

function StudentCardContent() {
  const { user, loading } = useUser();
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current && user?.studentCode) {
      JsBarcode(barcodeRef.current, user.studentCode, {
        background: "transparent",
        width: 2,
        height: 40,
        displayValue: false,
        lineColor: "#007A48",
      });
    }
  }, [user?.studentCode]);

  return (
    <>
      {loading ? (
        <div className="p-3 flex gap-3 items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-27 w-20 rounded-lg" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex-grow flex flex-col justify-between items-center space-y-2">
            <Skeleton className="h-5 w-32" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[50%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 flex gap-2 items-center justify-between">
          <div className="space-y-2">
            <UserAvatar className="h-27 w-20 rounded-lg" />
            <p className="text-[11.5px] text-muted-foreground">
              Mã SV: {user?.studentCode}
            </p>
          </div>
          <div className="flex-grow flex flex-col items-center space-y-3">
            <p className="uppercase text-center font-semibold">Thẻ sinh viên</p>
            <div className="w-full relative">
              <div className="w-full relative z-1">
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm font-light">Họ tên: </p>
                  <p className="text-sm text-end">{user?.name}</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm font-light">Ngày sinh: </p>
                  <p className="text-sm text-end">{user?.dateOfBirth}</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm font-light">Lớp: </p>
                  <p className="text-sm text-end">{user?.className}</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm font-light">Hạn sử dụng: </p>
                  <p className="text-sm text-end">{user?.academicYear}</p>
                </div>
              </div>
              <Image
                src={"/assets/images/vnua-hoa-van.svg"}
                alt="Vnua decor"
                width={100}
                height={100}
                className="opacity-30 dark:opacity-5 absolute z-0 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 "
              />
            </div>
            <svg ref={barcodeRef}></svg>
          </div>
        </div>
      )}
    </>
  );
}

function StudentCardFooter() {
  return (
    <>
      <div className="w-full h-1 bg-[#FCAF17]"></div>
      <div className="w-full h-1 bg-[#007A48]"></div>
      <div className="w-full h-1 bg-[#583F3B]"></div>
    </>
  );
}

export default function StudentCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        className,
        "w-full h-fit bg-background dark:bg-sidebar rounded-lg overflow-hidden relative"
      )}
    >
      <StudentCardHeader />
      <StudentCardContent />
      <StudentCardFooter />
    </div>
  );
}
