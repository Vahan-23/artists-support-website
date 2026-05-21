"use client";

import Link from "next/link";
import Image from "next/image";
import type { MouseEvent } from "react";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  onHomeClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /** Только значок — для мобильной шапки слева */
  iconOnly?: boolean;
};

export function Logo({ className, onHomeClick, iconOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onHomeClick}
      aria-label={iconOnly ? `На главную — ${siteConfig.shortName}` : undefined}
      className={cn(
        "group flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-90 sm:gap-3",
        iconOnly ? "shrink-0 justify-start" : "justify-center",
        className,
      )}
    >
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          iconOnly ? "size-10" : "size-10 sm:size-11",
        )}
        aria-hidden
      >
        <Image
          src="/logodark.png"
          alt=""
          fill
          sizes="44px"
          quality={100}
          className="object-contain [backface-visibility:hidden] dark:hidden"
        />
        <Image
          src="/logowhite.png"
          alt=""
          fill
          sizes="44px"
          quality={100}
          className="hidden object-contain [backface-visibility:hidden] dark:block"
        />
      </span>
      {iconOnly ? null : (
        <span className="flex flex-col items-center text-center leading-tight">
          <span className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {siteConfig.shortName}
          </span>
          <span className="mt-0.5 hidden text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:block sm:text-[0.7rem]">
            {siteConfig.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}

export function SiteTitleLink({
  className,
  onHomeClick,
}: {
  className?: string;
  onHomeClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href="/"
      onClick={onHomeClick}
      className={cn(
        "min-w-0 truncate px-2 text-center font-heading text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90",
        className,
      )}
    >
      {siteConfig.shortName}
    </Link>
  );
}
