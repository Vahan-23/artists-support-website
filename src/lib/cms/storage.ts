import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

import { participants as seedParticipants } from "@/data/participants-data";
import { experts as seedExperts } from "@/data/experts";
import type { Expert, Participant } from "@/types/cms";

const CMS_DIR = path.join(process.cwd(), "data", "cms");
const PARTICIPANTS_FILE = path.join(CMS_DIR, "participants.json");
const EXPERTS_FILE = path.join(CMS_DIR, "experts.json");

function ensureCmsDir() {
  if (!existsSync(CMS_DIR)) {
    mkdirSync(CMS_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, seed: T): T {
  ensureCmsDir();
  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  const raw = readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

function writeJsonFile<T>(filePath: string, data: T) {
  ensureCmsDir();
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function getParticipants(): Participant[] {
  return readJsonFile(PARTICIPANTS_FILE, seedParticipants);
}

export function saveParticipants(participants: Participant[]) {
  writeJsonFile(PARTICIPANTS_FILE, participants);
}

export function getExperts(): Expert[] {
  return readJsonFile(EXPERTS_FILE, seedExperts);
}

export function saveExperts(experts: Expert[]) {
  writeJsonFile(EXPERTS_FILE, experts);
}

export function slugifyId(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 48);
  return base || `item-${Date.now()}`;
}

export function uniqueId(base: string, existingIds: string[]): string {
  let id = base;
  let i = 2;
  while (existingIds.includes(id)) {
    id = `${base}-${i}`;
    i += 1;
  }
  return id;
}
