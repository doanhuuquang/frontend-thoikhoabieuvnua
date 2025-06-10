"use client";

import { useUser } from "@/contexts/UserContext";
import { LoaderCircle } from "lucide-react";

export default function Loader() {
  const { loading } = useUser();
  if (!loading) return null;

  return (
    <div className="fixed bg-black/60 inset-0 z-100 flex items-center justify-center">
      <div className="flex items-center gap-5 bg-background/70 p-3 rounded text-center">
        <LoaderCircle className="animate-spin h-6 w-6 text-primary" />
        <span>Đang lấy thông tin...</span>
      </div>
    </div>
  );
}
