import "@/styles/globals.css";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/narbar/navbar";
import { FallingEffect } from "@/components/effects/FallingEffect";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased",fontSans.className,)}>
        {/* <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}> */}
          <div className="relative flex flex-col h-screen">
            <FallingEffect type="heart" />
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">NextUI</p>
              </Link>
            </footer>
          </div>
        {/* </Providers> */}
      </body>
    </html>
  );
}
