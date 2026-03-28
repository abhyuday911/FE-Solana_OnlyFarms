import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SolanaProvider } from "@/components/providers/solana-provider";
import { Toaster } from "sonner";
import NavBar from "@/components/layout/NavBar";

const geistSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnlyFarms FE",
  description: "A very goated application that has only farms no cattles, goats or horses. Any one visiting the application W for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased bg-zinc-50 dark:bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SolanaProvider>
            <NavBar />
            {children}
            <Toaster position="top-center" />
          </SolanaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
