import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

import { participants as seedParticipants } from "@/data/participants-data";
import { experts as seedExperts } from "@/data/experts";
import type { Expert, Participant } from "@/types/cms";

import { isBlobStorageEnabled, readJsonBlob, writeJsonBlob } from "./blob";

export { slugifyId, uniqueId, encodeRouteId, decodeRouteId } from "./ids";

const CMS_DIR = path.join(process.cwd(), "data", "cms");
const PARTICIPANTS_FILE = path.join(CMS_DIR, "participants.json");
const EXPERTS_FILE = path.join(CMS_DIR, "experts.json");
const PARTICIPANTS_BLOB = "cms/participants.json";
const EXPERTS_BLOB = "cms/experts.json";

function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

function ensureCmsDir() {
  if (!existsSync(CMS_DIR)) {
    mkdirSync(CMS_DIR, { recursive: true });
  }
}

function readLocalJsonFile<T>(filePath: string, seed: T): T {
  ensureCmsDir();
  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  const raw = readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

function writeLocalJsonFile<T>(filePath: string, data: T) {
  ensureCmsDir();
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function readCmsJson<T>(
  blobPathname: string,
  localFilePath: string,
  seed: T,
): Promise<T> {
  if (isBlobStorageEnabled()) {
    const fromBlob = await readJsonBlob<T>(blobPathname);
    if (fromBlob !== null) {
      return fromBlob;
    }

    let initial = seed;
    if (!isVercelRuntime() && existsSync(localFilePath)) {
      const raw = readFileSync(localFilePath, "utf8");
      initial = JSON.parse(raw) as T;
    }

    await writeJsonBlob(blobPathname, initial);
    return initial;
  }

  return readLocalJsonFile(localFilePath, seed);
}

async function writeCmsJson<T>(
  blobPathname: string,
  localFilePath: string,
  data: T,
): Promise<void> {
  if (isBlobStorageEnabled()) {
    await writeJsonBlob(blobPathname, data);
    if (!isVercelRuntime()) {
      writeLocalJsonFile(localFilePath, data);
    }
    return;
  }

  writeLocalJsonFile(localFilePath, data);
}

export async function getParticipants(): Promise<Participant[]> {
  return readCmsJson(PARTICIPANTS_BLOB, PARTICIPANTS_FILE, seedParticipants);
}

export async function saveParticipants(participants: Participant[]): Promise<void> {
  await writeCmsJson(PARTICIPANTS_BLOB, PARTICIPANTS_FILE, participants);
}

export async function getExperts(): Promise<Expert[]> {
  return readCmsJson(EXPERTS_BLOB, EXPERTS_FILE, seedExperts);
}

export async function saveExperts(experts: Expert[]): Promise<void> {
  await writeCmsJson(EXPERTS_BLOB, EXPERTS_FILE, experts);
}
