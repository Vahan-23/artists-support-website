"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminFormHeaderProps = {
  backHref: string;
  backLabel?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function AdminFormHeader({
  backHref,
  backLabel = "Назад к списку",
  title,
  description,
  actions,
}: AdminFormHeaderProps) {
  return (
    <div className="mb-6 space-y-4">
      <Link
        href={backHref}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "inline-flex w-fit cursor-pointer gap-1.5 rounded-lg px-2 text-muted-foreground hover:text-foreground",
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        {backLabel}
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}

type AdminFormActionsProps = {
  cancelHref: string;
  saveLabel: string;
  formId: string;
  saving?: boolean;
};

export function AdminFormActions({
  cancelHref,
  saveLabel,
  formId,
  saving = false,
}: AdminFormActionsProps) {
  const router = useRouter();

  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-8 border-t border-border/70 bg-background/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6">
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push(cancelHref)}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 w-full cursor-pointer sm:w-auto sm:min-w-[140px]",
          )}
        >
          Отмена
        </button>
        <button
          type="submit"
          form={formId}
          disabled={saving}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "h-11 w-full cursor-pointer sm:w-auto sm:min-w-[160px]",
          )}
        >
          {saving ? "Сохранение…" : saveLabel}
        </button>
      </div>
    </div>
  );
}

export function AdminFormCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
