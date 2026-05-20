"use client";

import Link from "next/link";
import Image from "next/image";
import type { MouseEvent } from "react";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  onHomeClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function Logo({ className, onHomeClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onHomeClick}
      className={cn(
        "group flex min-w-0 items-center justify-center gap-2.5 transition-opacity hover:opacity-90 sm:gap-3",
        className,
      )}
    >
      <span
        className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden sm:size-11"
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
      <span className="flex flex-col items-center text-center leading-tight">
        <span className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {siteConfig.shortName}
        </span>
        <span className="mt-0.5 hidden text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:block sm:text-[0.7rem]">
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}
