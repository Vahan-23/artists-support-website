import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { DeleteEntityButton } from "@/components/admin/delete-entity-button";
import { ExpertForm } from "@/components/admin/expert-form";
import { getExperts } from "@/lib/cms/storage";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditExpertPage({ params }: PageProps) {
  const { id } = await params;
  const item = getExperts().find((e) => e.id === id);
  if (!item) notFound();

  return (
    <AdminShell>
      <ExpertForm
        initial={item}
        headerActions={
          <DeleteEntityButton
            apiPath={`/api/admin/experts/${id}`}
            redirectTo="/admin/experts"
            label={item.name}
          />
        }
      />
    </AdminShell>
  );
}
