"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{ duration: 4800 }}
      />
    </ThemeProvider>
  );
}
