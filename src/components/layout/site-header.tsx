"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/#komu-my-pomogaem", label: "Для кого" },
  { href: "/ekspertnyy-sovet", label: "Экспертный совет" },
  { href: "/uchastniki", label: "Участники" },
  { href: "/#kontakty", label: "Контакты" },
] as const;

function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active =
    href === "/"
      ? pathname === "/"
      : href.startsWith("/#")
        ? false
        : pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "relative text-sm font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        (href === "/#kontakty" || href === "/#komu-my-pomogaem") &&
          isHome &&
          "text-foreground",
      )}
    >
      {label}
      {active &&
        href !== "/#kontakty" &&
        href !== "/#komu-my-pomogaem" && (
        <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary/80" />
      )}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <Logo />

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Основная навигация"
        >
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
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

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background md:hidden"
          >
            <nav
              className="flex flex-col gap-1 px-4 py-4"
              aria-label="Мобильная навигация"
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
