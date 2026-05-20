import type { Metadata } from "next";

import { FloatingNotes } from "@/components/layout/floating-notes";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  keywords: [
    siteConfig.name,
    "некоммерческая организация",
    "детское творчество",
    "юношеское творчество",
    "образовательные проекты",
    "фестивали",
    "сценическое искусство",
    "культура",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: siteConfig.name,
    description: siteConfig.shortDescription,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.shortDescription,
  },
  robots: { index: true, follow: true },
};

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
