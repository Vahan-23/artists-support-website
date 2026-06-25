import { requireAdminApi } from "@/lib/auth/api-guard";
import { expertInputSchema } from "@/lib/cms/schemas";
import { getExperts, saveExperts } from "@/lib/cms/storage";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await context.params;
  const item = getExperts().find((e) => e.id === id);
  if (!item) {
    return Response.json({ error: "Эксперт не найден" }, { status: 404 });
  }
  return Response.json({ item });
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await context.params;
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = expertInputSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "Проверьте поля", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const items = getExperts();
  const index = items.findIndex((e) => e.id === id);
  if (index === -1) {
    return Response.json({ error: "Эксперт не найден" }, { status: 404 });
  }

  items[index] = { ...parsed.data, id };
  saveExperts(items);
  return Response.json({ item: items[index] });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await context.params;
  const items = getExperts();
  const next = items.filter((e) => e.id !== id);
  if (next.length === items.length) {
    return Response.json({ error: "Эксперт не найден" }, { status: 404 });
  }

  saveExperts(next);
  return Response.json({ ok: true });
}
