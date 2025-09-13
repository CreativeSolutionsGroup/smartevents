import type { Metadata } from "next";
import "./globals.css";
import AppBar from "@/components/appbar/appbar";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Cedarville University SmartEvents",
  description: "Event tracking and raffling for Cedarville University Campus Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-0 overflow-auto h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AppBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
