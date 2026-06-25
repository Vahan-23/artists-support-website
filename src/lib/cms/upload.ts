import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

const UPLOADS_ROOT = path.join(process.cwd(), "public", "uploads");

const ALLOWED_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

export async function saveUploadedImage(
  file: File,
  folder: "participants" | "experts",
): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Допустимы только JPG, PNG или WebP");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Файл не больше 5 МБ");
  }

  const dir = path.join(UPLOADS_ROOT, folder);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const ext = ALLOWED_TYPES.get(file.type)!;
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(path.join(dir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}
