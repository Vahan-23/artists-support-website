import { get, put, type PutCommandOptions } from "@vercel/blob";

export type BlobAccess = "public" | "private";

/** Должен совпадать с типом store в Vercel (Public / Private). */
export function getBlobAccess(): BlobAccess {
  const configured = process.env.BLOB_ACCESS;
  if (configured === "public" || configured === "private") {
    return configured;
  }
  return "public";
}

export function isBlobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function blobOptions(
  contentType?: string,
): Pick<PutCommandOptions, "access" | "addRandomSuffix" | "allowOverwrite" | "contentType"> {
  return {
    access: getBlobAccess(),
    addRandomSuffix: false,
    allowOverwrite: true,
    ...(contentType ? { contentType } : {}),
  };
}

export async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  const result = await get(pathname, { access: getBlobAccess() });
  if (!result?.stream || result.statusCode !== 200) {
    return null;
  }

  const text = await new Response(result.stream).text();
  return JSON.parse(text) as T;
}

export async function writeJsonBlob<T>(pathname: string, data: T): Promise<void> {
  await put(
    pathname,
    JSON.stringify(data, null, 2),
    blobOptions("application/json"),
  );
}

export async function writeImageBlob(
  pathname: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  const blob = await put(pathname, body, blobOptions(contentType));
  return blob.url;
}
