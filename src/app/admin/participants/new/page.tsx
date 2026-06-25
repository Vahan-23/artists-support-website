import { ParticipantForm } from "@/components/admin/participant-form";
import { AdminShell } from "@/components/admin/admin-shell";

export default function NewParticipantPage() {
  return (
    <AdminShell>
      <ParticipantForm />
    </AdminShell>
  );
}
