import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { DeleteEntityButton } from "@/components/admin/delete-entity-button";
import { ParticipantForm } from "@/components/admin/participant-form";
import { decodeRouteId, encodeRouteId } from "@/lib/cms/ids";
import { getParticipants } from "@/lib/cms/storage";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditParticipantPage({ params }: PageProps) {
  const { id: rawId } = await params;
  const id = decodeRouteId(rawId);
  const item = (await getParticipants()).find((p) => p.id === id);
  if (!item) notFound();

  return (
    <AdminShell>
      <ParticipantForm
        initial={item}
        headerActions={
          <DeleteEntityButton
            apiPath={`/api/admin/participants/${encodeRouteId(id)}`}
            redirectTo="/admin/participants"
            label={item.name}
          />
        }
      />
    </AdminShell>
  );
}
