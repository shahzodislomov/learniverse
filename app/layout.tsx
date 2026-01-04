import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConvexClientProvider } from "@/lib/convex";
import { QueryProvider } from "@/lib/query-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "LearnHub - Master Cybersecurity",
  description: "Learn cybersecurity through comprehensive courses, hands-on labs, and expert resources.",
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ConvexClientProvider>
          <QueryProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </QueryProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}