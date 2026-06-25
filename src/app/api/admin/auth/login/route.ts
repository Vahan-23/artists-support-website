import { verifyAdminCredentials } from "@/lib/auth/credentials";
import { createAdminSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/cms/schemas";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Введите логин и пароль" }, { status: 400 });
  }

  const { username, password } = parsed.data;

  if (!process.env.ADMIN_SESSION_SECRET) {
    return Response.json(
      { error: "Админ-панель не настроена (ADMIN_SESSION_SECRET)" },
      { status: 503 },
    );
  }

  if (!verifyAdminCredentials(username, password)) {
    return Response.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }

  await createAdminSession();
  return Response.json({ ok: true });
}
