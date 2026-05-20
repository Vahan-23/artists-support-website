/** Высота sticky header + небольшой отступ */
export function getHeaderScrollOffset(): number {
  const header = document.querySelector("header");
  return (header?.getBoundingClientRect().height ?? 140) + 12;
}

function getSectionDocumentTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

/** Прокрутка так, чтобы заголовок секции был сразу под шапкой */
export function scrollToSectionId(
  id: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const top = getSectionDocumentTop(el) - getHeaderScrollOffset();
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

export function isHomeAnchorHref(href: string): href is `/#${string}` {
  return href.startsWith("/#") && href.length > 2;
}

export function getAnchorSectionId(href: string): string | null {
  return isHomeAnchorHref(href) ? href.slice(2) : null;
}
