import { requireAdminApi } from "@/lib/auth/api-guard";
import { saveUploadedImage } from "@/lib/cms/upload";

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return Response.json({ error: "Файл не передан" }, { status: 400 });
    }

    if (folder !== "participants" && folder !== "experts") {
      return Response.json({ error: "Некорректная папка" }, { status: 400 });
    }

    const url = await saveUploadedImage(file, folder);
    return Response.json({ url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Не удалось загрузить файл";
    return Response.json({ error: message }, { status: 400 });
  }
}
