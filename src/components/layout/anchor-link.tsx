"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

import { getAnchorSectionId, scrollToSectionId } from "@/lib/scroll-to-section";

type AnchorLinkProps = ComponentProps<typeof Link>;

export function AnchorLink({ href, onClick, ...props }: AnchorLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const sectionId =
      typeof href === "string" ? getAnchorSectionId(href) : null;
    if (!sectionId) return;

    event.preventDefault();
    document.body.style.overflow = "";

    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }

    scrollToSectionId(sectionId);
    history.replaceState(null, "", `/#${sectionId}`);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
