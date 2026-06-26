import Link from "next/link";
import { ChevronRightIcon, PlusIcon } from "lucide-react";

import { AdminShell, AdminThumb } from "@/components/admin/admin-shell";
import { buttonVariants } from "@/components/ui/button";
import { encodeRouteId } from "@/lib/cms/ids";
import { getExperts } from "@/lib/cms/storage";
import { cn } from "@/lib/utils";

export default async function AdminExpertsPage() {
  const items = await getExperts();

  return (
    <AdminShell title="Эксперты">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "эксперт" : "экспертов"}
        </p>
        <Link
          href="/admin/experts/new"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "gap-1.5 rounded-lg",
          )}
        >
          <PlusIcon className="size-4" />
          Добавить
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        {items.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-muted-foreground">
            Пока никого нет. Нажмите «Добавить».
          </p>
        ) : (
          <ul className="divide-y divide-border/70">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/admin/experts/${encodeRouteId(item.id)}/edit`}
                  className="flex items-center gap-3 px-4 py-4 transition-colors hover:bg-muted/40"
                >
                  <AdminThumb src={item.imageSrc} alt={item.name} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                      {item.role}
                    </p>
                  </div>
                  <ChevronRightIcon
                    className="size-5 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
