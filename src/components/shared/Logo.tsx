import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex gap-3">
        <Image alt="Logo" src="/logo.svg" width={35} height={35} />
        <div>
          <p className="font-semibold">Vnua Calendar</p>
          <p className="text-xs text-muted-foreground">Thời khóa biểu Vnua</p>
        </div>
      </div>
    </Link>
  );
}
