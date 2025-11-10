import type { Metadata } from "next";
import "./globals.css";
import AppBar from "@/components/appbar/appbar";
import ThemeProvider from "@/components/theme-provider";
import FeedbackButton from "@/components/feedback/feedback-button";


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
          <FeedbackButton />
          <AppBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
