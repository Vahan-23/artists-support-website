import { requireAdminApi } from "@/lib/auth/api-guard";
import { participantInputSchema } from "@/lib/cms/schemas";
import {
  getParticipants,
  saveParticipants,
  slugifyId,
  uniqueId,
} from "@/lib/cms/storage";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return Response.json({ items: await getParticipants() });
}

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = participantInputSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "Проверьте поля", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const items = await getParticipants();
  const baseId = parsed.data.id ?? slugifyId(parsed.data.name);
  const id = uniqueId(
    baseId,
    items.map((item) => item.id),
  );

  const participant = { ...parsed.data, id };
  items.push(participant);
  await saveParticipants(items);

  return Response.json({ item: participant }, { status: 201 });
}
