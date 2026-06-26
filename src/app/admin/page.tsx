import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { buttonVariants } from "@/components/ui/button";
import { getExperts, getParticipants } from "@/lib/cms/storage";
import { cn } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const participants = await getParticipants();
  const experts = await getExperts();

  return (
    <AdminShell title="Обзор">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Участники</p>
          <p className="mt-2 font-heading text-3xl font-semibold">
            {participants.length}
          </p>
          <Link
            href="/admin/participants"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "mt-4 inline-flex rounded-lg",
            )}
          >
            Управлять
          </Link>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Эксперты</p>
          <p className="mt-2 font-heading text-3xl font-semibold">
            {experts.length}
          </p>
          <Link
            href="/admin/experts"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "mt-4 inline-flex rounded-lg",
            )}
          >
            Управлять
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
