import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-[100vw] h-[100vh] bg-background dark:bg-sidebar flex flex-col items-center justify-center gap-3">
      <Image
        alt="404"
        src={"/assets/images/404-error-with-a-broken-robot.svg"}
        width={400}
        height={100}
      />
      <h2 className="text-muted-foreground">
        Không tìm thấy trang bạn yêu cầu
      </h2>
      <Link href={"/"} className="px-10 py-2 rounded-md bg-accent">
        Quay về trang chủ
      </Link>
    </div>
  );
}
