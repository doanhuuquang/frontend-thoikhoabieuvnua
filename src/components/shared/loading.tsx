import { cn } from "@/lib/utils";
import Image from "next/image";

function Loading({ ...prop }: React.ComponentProps<"div">) {
  return <div {...prop} />;
}

function LoadingOverlay({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full h-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function LoadingAnimation({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <Image
        alt="loading..."
        src={"/assets/animations/loading-animation.svg"}
        width={64}
        height={64}
      />
    </div>
  );
}

function LoadingContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "z-51 fixed t-[50%] left-[50%] -translate-x-[50%] translate-y-[50%] flex flex-col items-center gap-10",
        className
      )}
      {...props}
    >
      <LoadingAnimation />
      {children}
    </div>
  );
}

export { Loading, LoadingOverlay, LoadingAnimation, LoadingContent };
