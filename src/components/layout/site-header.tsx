"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useActiveNav } from "@/hooks/use-active-nav";
import { cn } from "@/lib/utils";

const nav: {
  href: string;
  label: string;
}[] = [
  { href: "/", label: "Главная" },
  { href: "/#o-proekte", label: "О проекте" },
  { href: "/#komu-my-pomogaem", label: "Для кого" },
  { href: "/#kak-eto-rabotaet", label: "Как участвовать" },
  { href: "/#napravleniya", label: "Направления" },
  { href: "/#dlya-roditeley", label: "Для родителей" },
  { href: "/ekspertnyy-sovet", label: "Эксперты" },
  { href: "/uchastniki", label: "Участники" },
  { href: "/#kontakty", label: "Контакты" },
];

function NavItem({
  href,
  label,
  isActive,
  className,
  isMobile,
  onMenuClose,
  onHomeClick,
  onAnchorClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  className?: string;
  isMobile?: boolean;
  onMenuClose?: () => void;
  onHomeClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onAnchorClick?: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
}) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) {
      event.preventDefault();
      onMenuClose?.();
      document.body.style.overflow = "";
    }

    if (href === "/") {
      onHomeClick?.(event);
      return;
    }

    if (href.startsWith("/#")) {
      onAnchorClick?.(event, href);
      return;
    }

    if (isMobile) {
      router.push(href);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/12 font-semibold text-primary shadow-sm ring-1 ring-primary/15"
          : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isActive, handleHomeNavClick, handleAnchorNavClick } = useActiveNav();

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/85",
        open && "max-md:backdrop-blur-none max-md:supports-[backdrop-filter]:bg-background",
      )}
    >
      {/* Верхняя строка: логотип по центру */}
      <div className="relative mx-auto flex h-[4.25rem] max-w-6xl items-center justify-center px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Logo
          className="px-12 sm:px-14"
          onHomeClick={handleHomeNavClick}
        />

        <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-2 sm:right-6 lg:right-8">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border/80 bg-background text-foreground shadow-sm transition-colors hover:bg-muted md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Нижняя строка: меню */}
      <nav
        className="hidden border-t border-border/50 bg-muted/25 md:block"
        aria-label="Основная навигация"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-0.5 py-2 sm:gap-1 sm:py-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <NavItem
                  href={item.href}
                  label={item.label}
                  isActive={isActive(item.href)}
                  onAnchorClick={handleAnchorNavClick}
                  onHomeClick={handleHomeNavClick}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {pathname !== "/" && (
        <div className="border-t border-border/40 bg-muted/15 px-4 py-1.5 text-center md:py-2">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            {pathname === "/ekspertnyy-sovet" && "Экспертный совет"}
            {pathname === "/uchastniki" && "Участники программы"}
          </p>
        </div>
      )}

    </header>

    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Закрыть меню"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/45 touch-manipulation md:hidden"
            onClick={closeMenu}
          />
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.25rem] z-[61] max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-border/60 bg-background shadow-2xl touch-manipulation sm:top-[4.5rem] sm:max-h-[calc(100dvh-4.5rem)] md:hidden"
            aria-label="Мобильная навигация"
          >
            <ul className="flex flex-col gap-0.5 px-3 py-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <NavItem
                    href={item.href}
                    label={item.label}
                    isActive={isActive(item.href)}
                    isMobile
                    className="block w-full px-3 py-3 text-base"
                    onMenuClose={closeMenu}
                    onAnchorClick={handleAnchorNavClick}
                    onHomeClick={handleHomeNavClick}
                  />
                </li>
              ))}
            </ul>
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
    </>
  );
}
