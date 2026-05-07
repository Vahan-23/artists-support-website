"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ParticipantCard } from "@/components/participants/participant-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { participants } from "@/data/participants";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function ParticipantsView() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return participants;
    return participants.filter((p) => normalize(p.name).includes(q));
  }, [query]);

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="mx-auto max-w-md space-y-2 sm:max-w-lg">
        <Label htmlFor="participant-search" className="sr-only">
          Поиск по имени
        </Label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="participant-search"
            type="search"
            placeholder="Имя участника…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 rounded-xl border-border/80 pl-10 text-base shadow-sm"
            autoComplete="off"
          />
        </div>
        <p className="text-center text-sm text-muted-foreground" aria-live="polite">
          Найдено: {filtered.length} из {participants.length}
        </p>
      </div>

      {filtered.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-border/80 bg-muted/30 py-16 text-center text-muted-foreground"
        >
          Ничего не найдено. Попробуйте другой запрос.
        </motion.p>
      ) : (
        <motion.ul
          layout
          className="grid list-none gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
          role="list"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((participant, index) => (
              <li key={participant.id} role="listitem" className="h-full">
                <ParticipantCard participant={participant} index={index} />
              </li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
