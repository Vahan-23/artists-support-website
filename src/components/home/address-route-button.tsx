"use client";

import { Navigation } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  getSavedMapsProvider,
  openGoogleMaps,
  openSmartMapsNavigation,
  openYandexMaps,
  type MapsProvider,
} from "@/lib/maps-navigation";
import { cn } from "@/lib/utils";

type AddressRouteButtonProps = {
  address: string;
};

export function AddressRouteButton({ address }: AddressRouteButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedProvider, setSavedProvider] = useState<MapsProvider | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSavedProvider(getSavedMapsProvider());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const handleRouteClick = () => {
    const result = openSmartMapsNavigation(address, savedProvider);
    if (result === "chooser") {
      setMenuOpen((open) => !open);
      return;
    }
    setMenuOpen(false);
  };

  const handleProviderClick = (provider: MapsProvider) => {
    if (provider === "google") openGoogleMaps(address);
    else openYandexMaps(address);
    setSavedProvider(provider);
    setMenuOpen(false);
  };

  return (
    <div ref={containerRef} className="relative mt-2">
      <button
        type="button"
        onClick={handleRouteClick}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "h-9 cursor-pointer gap-1.5 rounded-lg px-3 text-sm",
        )}
      >
        <Navigation className="size-3.5" aria-hidden />
        Маршрут
      </button>

      {menuOpen ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-20 mt-1.5 min-w-[11rem] overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-md"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => handleProviderClick("google")}
            className="flex w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-foreground hover:bg-accent"
          >
            Google Maps
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => handleProviderClick("yandex")}
            className="flex w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-foreground hover:bg-accent"
          >
            Яндекс Карты
          </button>
        </div>
      ) : null}
    </div>
  );
}
