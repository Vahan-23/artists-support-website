import { isAdminAuthenticated } from "@/lib/auth/session";

export async function requireAdminApi(): Promise<Response | null> {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return Response.json({ error: "Требуется авторизация" }, { status: 401 });
  }
  return null;
}
