"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/participants", label: "Участники" },
  { href: "/admin/experts", label: "Эксперты" },
] as const;

function isAdminNavActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Админ-панель
            </p>
            <p className="font-heading text-lg font-semibold">{siteConfig.shortName}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {nav.map((item) => {
              const active = isAdminNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "rounded-lg",
                    active &&
                      "bg-primary/12 font-semibold text-primary ring-1 ring-primary/15",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-lg",
              )}
            >
              На сайт
            </Link>
            <button
              type="button"
              onClick={logout}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "cursor-pointer gap-1.5 rounded-lg",
              )}
            >
              <LogOut className="size-4" aria-hidden />
              Выйти
            </button>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {title ? (
          <h1 className="mb-6 font-heading text-2xl font-semibold tracking-tight">
            {title}
          </h1>
        ) : null}
        {children}
      </div>
    </div>
  );
}

export function AdminThumb({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
      <Image src={src} alt={alt} fill className="object-cover" sizes="48px" />
    </div>
  );
}
