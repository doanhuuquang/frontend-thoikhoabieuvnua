import Header from "@/components/shared/app-header";
import AppSidebar from "@/components/shared/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full min-w-[300px] bg-accent dark:bg-background">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
