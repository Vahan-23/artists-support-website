import { requireAdminApi } from "@/lib/auth/api-guard";
import { expertInputSchema } from "@/lib/cms/schemas";
import {
  getExperts,
  saveExperts,
  slugifyId,
  uniqueId,
} from "@/lib/cms/storage";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return Response.json({ items: getExperts() });
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

  const parsed = expertInputSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "Проверьте поля", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const items = getExperts();
  const baseId = parsed.data.id ?? slugifyId(parsed.data.name);
  const id = uniqueId(
    baseId,
    items.map((item) => item.id),
  );

  const expert = { ...parsed.data, id };
  items.push(expert);
  saveExperts(items);

  return Response.json({ item: expert }, { status: 201 });
}
