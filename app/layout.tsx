import Hydrate from "@/components/Hydrate";
import { PHProvider } from "@/components/posthog-provider";
import Providers from "@/components/Providers";
import QueryProvider from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Barlow, Inter } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Loading from "./loading";

const InterFont = Inter({
  subsets: ["latin"],
});

const BarlowFont = Barlow({
  subsets: ["latin-ext"],
  weight: ["500", "700"],
  style: "normal",
  variable: "--font-barlow",
  preload: true,
});

export const metadata: Metadata = {
  title: "GoShop",
  description: "A multi-vendor shop built with Next.js",
};

const PostHogPageView = dynamic(() => import("@/components/PostHogPageView"));
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${InterFont.className} ${BarlowFont.variable}`}>
        <Hydrate>
          <Suspense fallback={<Loading />}>
            <PHProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <QueryProvider>
                  <Providers>
                    <Toaster position="top-center" reverseOrder={false} />
                    <PostHogPageView />
                    {children}
                    <Analytics />
                  </Providers>
                </QueryProvider>
              </ThemeProvider>
            </PHProvider>
          </Suspense>
        </Hydrate>
      </body>
    </html>
  );
}
