import ModeToggle from "@/components/shared/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "@/components/shared/logo";

export default function Header() {
  return (
    <header className="z-50 h-[64px] sticky top-0 flex items-center border-b bg-background/60 dark:bg-sidebar/60 backdrop-blur-sm">
      <div className="w-full max-w-7xl m-auto px-3 flex lg:flex-row md:flex-row flex-row-reverse items-center justify-between">
        <div className="grow lg:justify-between md:justify-between justify-end flex lg:flex-row md:flex-row items-center gap-3">
          <SidebarTrigger />
          <ModeToggle />
        </div>
        <Logo className="lg:hidden md:hidden" />
      </div>
    </header>
  );
}
