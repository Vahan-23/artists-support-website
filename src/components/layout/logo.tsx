"use client";

import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/lib/site-config";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3.5 transition-opacity hover:opacity-90"
    >
      <span
        className="relative flex size-12 origin-center items-center justify-center overflow-hidden transform-gpu will-change-transform group-hover:[animation:logo-spin-y_1.1s_linear_infinite]"
        aria-hidden
      >
        <Image
          src="/logodark.png"
          alt=""
          fill
          sizes="36px"
          quality={100}
          className="object-contain [backface-visibility:hidden] dark:hidden"
        />
        <Image
          src="/logowhite.png"
          alt=""
          fill
          sizes="36px"
          quality={100}
          className="hidden object-contain [backface-visibility:hidden] dark:block"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {siteConfig.name}
        </span>
        <span className="mt-0.5 flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          живой голос нового поколения
        </span>
      </span>
    </Link>
  );
}
