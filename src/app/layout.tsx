import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/contexts/UserContext";
import { ScheduleProvider } from "@/contexts/ScheduleContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vnua Calendar",
  description: "Thời khóa biểu Vnua",
  icons: {
    icon: "/assets/icons/favicon/favicon.ico",
    apple: "/assets/icons/favicon/apple-touch-icon.png",
    shortcut: "/assets/icons/favicon/favicon-16x16.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00ff91" },
    { media: "(prefers-color-scheme: dark)", color: "#22223B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${montserrat.variable} bg-background text-foreground antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <ScheduleProvider>
              {children}
              <Toaster />
            </ScheduleProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
