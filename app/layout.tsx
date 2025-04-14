import Hydrate from "@/components/Hydrate";
import { PHProvider } from "@/components/posthog-provider";
import Providers from "@/components/Providers";
import QueryProvider from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Loading from "./loading";
import { Hind_Siliguri } from "next/font/google";
const siliguri = Hind_Siliguri({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Craft Institute",
  description: "Craft Institute is a platform for learning and development",
};

const PostHogPageView = dynamic(() => import("@/components/PostHogPageView"));
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${siliguri.className} bg-white`}>
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
