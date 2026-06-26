/** Безопасный id для URL и API (только латиница, цифры, дефис). */
export function slugifyId(name: string): string {
  const ascii = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
  const suffix = Date.now().toString(36);
  return ascii ? `${ascii}-${suffix}` : `item-${suffix}`;
}

export function uniqueId(base: string, existingIds: string[]): string {
  let id = base;
  let i = 2;
  while (existingIds.includes(id)) {
    id = `${base}-${i}`;
    i += 1;
  }
  return id;
}

export function encodeRouteId(id: string): string {
  return encodeURIComponent(id);
}

export function decodeRouteId(id: string): string {
  try {
    return decodeURIComponent(id);
  } catch {
    return id;
  }
}
