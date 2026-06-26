import { requireAdminApi } from "@/lib/auth/api-guard";
import { decodeRouteId } from "@/lib/cms/ids";
import { participantInputSchema } from "@/lib/cms/schemas";
import { getParticipants, saveParticipants } from "@/lib/cms/storage";

type RouteContext = { params: Promise<{ id: string }> };

async function resolveId(context: RouteContext) {
  const { id } = await context.params;
  return decodeRouteId(id);
}

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const id = await resolveId(context);
  const item = (await getParticipants()).find((p) => p.id === id);
  if (!item) {
    return Response.json({ error: "Участник не найден" }, { status: 404 });
  }
  return Response.json({ item });
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const id = await resolveId(context);
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
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) {
    return Response.json({ error: "Участник не найден" }, { status: 404 });
  }

  items[index] = { ...parsed.data, id };
  await saveParticipants(items);
  return Response.json({ item: items[index] });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const id = await resolveId(context);
  const items = await getParticipants();
  const next = items.filter((p) => p.id !== id);
  if (next.length === items.length) {
    return Response.json({ error: "Участник не найден" }, { status: 404 });
  }

  await saveParticipants(next);
  return Response.json({ ok: true });
}
