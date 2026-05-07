import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

const footerNav = [
  { href: "/", label: "Главная" },
  { href: "/#komu-my-pomogaem", label: "Для кого" },
  { href: "/ekspertnyy-sovet", label: "Экспертный совет" },
  { href: "/uchastniki", label: "Участники" },
  { href: "/#kontakty", label: "Связаться" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-auto border-t border-border/70 bg-muted/30">
      <div className="section-shell py-12 sm:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="font-heading text-lg font-semibold tracking-tight">
              {siteConfig.name}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteConfig.shortDescription}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Подвал">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Некоммерческий
            проект.
          </p>
          <div className="flex gap-6">
            <a
              href={siteConfig.social.telegram}
              className="transition-colors hover:text-foreground"
              rel="noopener noreferrer"
              target="_blank"
            >
              Telegram
            </a>
            <a
              href={siteConfig.social.vk}
              className="transition-colors hover:text-foreground"
              rel="noopener noreferrer"
              target="_blank"
            >
              VK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
