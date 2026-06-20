import type { Metadata } from "next";

import { FloatingNotes } from "@/components/layout/floating-notes";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { rootMetadata } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className="h-full scroll-smooth antialiased"
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteJsonLd />
        <Providers>
          <FloatingNotes />
          <SiteHeader />
          <main className="relative z-10 flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
