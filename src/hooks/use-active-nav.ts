"use client";

import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  getAnchorSectionId,
  getHeaderScrollOffset,
  scrollToSectionId,
} from "@/lib/scroll-to-section";

/** Секции главной в порядке сверху вниз */
const HOME_SECTION_IDS = [
  "o-proekte",
  "komu-my-pomogaem",
  "kak-eto-rabotaet",
  "napravleniya",
  "dlya-roditeley",
  "uchrediteli",
  "ekspertnyy-sovet",
  "kontakty",
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

function getSectionDocumentTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

function getActiveSectionFromScroll(): HomeSectionId | null {
  const marker = window.scrollY + getHeaderScrollOffset();
  const sections: { id: HomeSectionId; top: number }[] = [];

  for (const id of HOME_SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    sections.push({ id, top: getSectionDocumentTop(el) });
  }

  if (sections.length === 0) return null;

  if (marker < sections[0].top) return null;

  let active: HomeSectionId = sections[0].id;
  for (const section of sections) {
    if (marker >= section.top) active = section.id;
  }
  return active;
}

function syncUrlHash(section: HomeSectionId | null) {
  if (window.location.pathname !== "/") return;
  const nextHash = section ? `#${section}` : "";
  if (window.location.hash !== nextHash) {
    history.replaceState(null, "", nextHash || "/");
  }
}

/** Активный пункт меню: маршрут или секция на главной при скролле. */
export function useActiveNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [homeSection, setHomeSection] = useState<HomeSectionId | null>(null);

  const applyScrollSpy = useCallback(() => {
    if (pathname !== "/") return;
    const active = getActiveSectionFromScroll();
    setHomeSection(active);
    syncUrlHash(active);
  }, [pathname]);

  const syncAfterScroll = useCallback(() => {
    if (pathname !== "/") return;
    applyScrollSpy();
    requestAnimationFrame(() => {
      applyScrollSpy();
      requestAnimationFrame(applyScrollSpy);
    });
    for (const delay of [50, 120, 280, 500]) {
      window.setTimeout(applyScrollSpy, delay);
    }
  }, [pathname, applyScrollSpy]);

  const scrollToHomeTop = useCallback(() => {
    if (pathname !== "/") return;
    setHomeSection(null);
    syncUrlHash(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    syncAfterScroll();
  }, [pathname, syncAfterScroll]);

  const handleHomeNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        event.preventDefault();
        scrollToHomeTop();
      } else {
        router.push("/");
      }
      event.currentTarget.blur();
    },
    [pathname, router, scrollToHomeTop],
  );

  const handleAnchorNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      const sectionId = getAnchorSectionId(href);
      if (!sectionId) return;

      event.preventDefault();

      if (pathname !== "/") {
        router.push(href);
        return;
      }

      document.body.style.overflow = "";

      const runScroll = () => {
        scrollToSectionId(sectionId);
        history.replaceState(null, "", href);
        setHomeSection(
          HOME_SECTION_IDS.includes(sectionId as HomeSectionId)
            ? (sectionId as HomeSectionId)
            : null,
        );
        syncAfterScroll();
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(runScroll);
      });
      event.currentTarget.blur();
    },
    [pathname, router, syncAfterScroll],
  );

  useEffect(() => {
    if (pathname !== "/") {
      setHomeSection(null);
      return;
    }

    const hashId = window.location.hash.slice(1);
    if (hashId && HOME_SECTION_IDS.includes(hashId as HomeSectionId)) {
      requestAnimationFrame(() => {
        scrollToSectionId(hashId, "auto");
        applyScrollSpy();
      });
    }

    let rafId = 0;
    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(applyScrollSpy);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(applyScrollSpy, 120);
    };

    applyScrollSpy();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    if ("onscrollend" in window) {
      window.addEventListener("scrollend", scheduleUpdate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if ("onscrollend" in window) {
        window.removeEventListener("scrollend", scheduleUpdate);
      }
    };
  }, [pathname, applyScrollSpy]);

  function isActive(href: string): boolean {
    if (href === "/") {
      return pathname === "/" && homeSection === null;
    }
    if (href.startsWith("/#")) {
      if (pathname !== "/") return false;
      return homeSection === href.slice(2);
    }
    if (href === "/ekspertnyy-sovet") {
      return (
        pathname === href ||
        (pathname === "/" && homeSection === "ekspertnyy-sovet")
      );
    }
    return pathname === href;
  }

  return {
    isActive,
    homeSection,
    pathname,
    handleHomeNavClick,
    handleAnchorNavClick,
  };
}
