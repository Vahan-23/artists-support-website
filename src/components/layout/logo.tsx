import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
    >
      <span
        className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-[1.02]"
        aria-hidden
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-95"
        >
          <path
            d="M12 3L4 8.5V15.5L12 21L20 15.5V8.5L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V16M9 10L15 14M15 10L9 14"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-base font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
        <span className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          первая сцена — с нами
        </span>
      </span>
    </Link>
  );
}
