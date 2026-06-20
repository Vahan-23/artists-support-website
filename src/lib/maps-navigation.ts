const MAPS_PREFERENCE_KEY = "opnstage-maps-provider";

export type MapsProvider = "google" | "yandex";

function encodeAddress(address: string): string {
  return encodeURIComponent(address);
}

export function getGoogleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeAddress(address)}`;
}

export function getYandexMapsUrl(address: string): string {
  return `https://yandex.ru/maps/?text=${encodeAddress(address)}`;
}

function getGoogleMapsDeepLink(address: string): string {
  return `comgooglemaps://?q=${encodeAddress(address)}`;
}

function getYandexMapsDeepLink(address: string): string {
  return `yandexmaps://maps.yandex.ru/?text=${encodeAddress(address)}`;
}

function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function getSavedMapsProvider(): MapsProvider | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(MAPS_PREFERENCE_KEY);
  return value === "google" || value === "yandex" ? value : null;
}

export function saveMapsProvider(provider: MapsProvider): void {
  localStorage.setItem(MAPS_PREFERENCE_KEY, provider);
}

function openInNewTab(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer");
}

/** Открывает Google Maps (приложение или веб). */
export function openGoogleMaps(address: string): void {
  saveMapsProvider("google");
  const webUrl = getGoogleMapsUrl(address);

  if (!isMobileDevice()) {
    openInNewTab(webUrl);
    return;
  }

  if (isIOS()) {
    window.location.href = getGoogleMapsDeepLink(address);
    window.setTimeout(() => openInNewTab(webUrl), 800);
    return;
  }

  openInNewTab(webUrl);
}

/** Открывает Яндекс Карты / Навигатор (приложение или веб). */
export function openYandexMaps(address: string): void {
  saveMapsProvider("yandex");
  const webUrl = getYandexMapsUrl(address);

  if (!isMobileDevice()) {
    openInNewTab(webUrl);
    return;
  }

  if (isIOS()) {
    window.location.href = getYandexMapsDeepLink(address);
    window.setTimeout(() => openInNewTab(webUrl), 800);
    return;
  }

  openInNewTab(webUrl);
}

/**
 * На Android — системный выбор карт (Google, Яндекс и др.).
 * На остальных платформах — сохранённый провайдер или меню выбора.
 */
export function openSmartMapsNavigation(
  address: string,
  savedProvider: MapsProvider | null,
): "chooser" | "opened" {
  if (isAndroid()) {
    window.location.href = `geo:0,0?q=${encodeAddress(address)}`;
    return "opened";
  }

  if (savedProvider === "google") {
    openGoogleMaps(address);
    return "opened";
  }

  if (savedProvider === "yandex") {
    openYandexMaps(address);
    return "opened";
  }

  return "chooser";
}
