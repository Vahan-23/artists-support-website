import { FloatingNotes } from "@/components/layout/floating-notes";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteJsonLd } from "@/components/seo/site-json-ld";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteJsonLd />
      <FloatingNotes />
      <SiteHeader />
      <main className="relative z-10 flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
