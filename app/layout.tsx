import "@/styles/globals.css";
import { Link } from "@heroui/link";
import clsx from "clsx";
import Image from "next/image";

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
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.className
        )}
      >
        {/* Fixed Background image wrapper */}
        {/* <div className="fixed inset-0 -z-10 h-screen w-screen">
          <Image
            src="/background.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div> */}

        {/* Content overlay */}
        <div className="relative flex flex-col min-h-screen">
          <FallingEffect type="snow" />
          <Navbar />
          <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
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
      </body>
    </html>
  );
}
