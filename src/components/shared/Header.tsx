import ModeToggle from "@/components/shared/ModeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="z-50 h-[64px] sticky top-0 flex items-center border-b bg-background/60 dark:bg-sidebar/60 backdrop-blur-sm">
      <div className="w-full max-w-7xl m-auto px-3 flex items-center">
        <SidebarTrigger />
        <div className="ml-auto flex items-center gap-3">
          <ModeToggle />
          <Button variant={"outline"}>
            <Image
              alt="Buy me a coffe"
              src={"/assets/images/logos/bmc-brand-logo.svg"}
              width={100}
              height={40}
              className="dark:hidden block"
            />
            <Image
              alt="Buy me a coffe"
              src={"/assets/images/logos/bmc-brand-logo-dark.svg"}
              width={100}
              height={40}
              className="dark:block hidden"
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
