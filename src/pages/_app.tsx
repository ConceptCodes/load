import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DM_Sans } from "next/font/google";

import { ThemeProvider } from "@/components/ui/theme-wrapper";
import { Toaster } from "@/components/ui/toaster";

import { api } from "@/lib/api";

import "@/styles/globals.css";

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <main className={[...dmSans.className].join(" ")}>
          <Component {...pageProps} />
          <Toaster />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
