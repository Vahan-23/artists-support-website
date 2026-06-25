"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2Icon, Trash2Icon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DeleteEntityButton({
  apiPath,
  redirectTo,
  label,
}: {
  apiPath: string;
  redirectTo: string;
  label: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const remove = async () => {
    if (!window.confirm(`Удалить: ${label}?`)) return;
    setLoading(true);
    try {
      const res = await fetch(apiPath, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.push(redirectTo);
      router.refresh();
    } catch {
      window.alert("Не удалось удалить");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={remove}
      disabled={loading}
      className={cn(
        buttonVariants({ variant: "destructive", size: "sm" }),
        "cursor-pointer gap-1.5",
      )}
    >
      {loading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : (
        <Trash2Icon className="size-4" />
      )}
      Удалить
    </button>
  );
}
