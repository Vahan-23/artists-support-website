import { get, put } from "@vercel/blob";

export function isBlobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

const JSON_PUT_OPTIONS = {
  access: "private" as const,
  addRandomSuffix: false,
  allowOverwrite: true,
  contentType: "application/json",
};

export async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  const result = await get(pathname, { access: "private" });
  if (!result?.stream || result.statusCode !== 200) {
    return null;
  }

  const text = await new Response(result.stream).text();
  return JSON.parse(text) as T;
}

export async function writeJsonBlob<T>(pathname: string, data: T): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), JSON_PUT_OPTIONS);
}
