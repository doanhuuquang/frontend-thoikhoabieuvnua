import Header from "@/components/shared/header";
import AppSidebar from "@/components/shared/side-bar";
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
      <main className="w-full bg-accent dark:bg-background min-w-[300px]">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
