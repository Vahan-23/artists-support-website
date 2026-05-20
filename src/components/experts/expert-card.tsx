"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useId, useState } from "react";

import {
  ExpertBioContent,
  expertBioIsLong,
} from "@/components/experts/expert-bio-content";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Expert } from "@/data/experts";
import { cn } from "@/lib/utils";

type ExpertCardProps = {
  expert: Expert;
  index: number;
};

/** Единая высота свёрнутого текста — кнопка на одной линии в ряду карточек */
const COLLAPSED_BIO_HEIGHT_CLASS = "h-[11.5rem]";

export function ExpertCard({ expert, index }: ExpertCardProps) {
  const [expanded, setExpanded] = useState(false);
  const bioId = useId();
  const isLongBio = expertBioIsLong(expert.bio);

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card className="group flex h-full flex-col overflow-hidden border-border/70 bg-card/80 shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.06]">
        <div className="relative aspect-[5/6] shrink-0 overflow-hidden bg-muted">
          <Image
            src={expert.imageSrc}
            alt={`Портрет: ${expert.name}`}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
            className="object-cover object-[center_12%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <CardHeader className="gap-1.5 pb-2 pt-5">
          <CardTitle className="font-heading text-lg leading-snug transition-colors group-hover:text-primary">
            {expert.name}
          </CardTitle>
          <p className="line-clamp-3 min-h-[2.75rem] text-xs font-semibold uppercase tracking-wide text-primary/90">
            {expert.role}
          </p>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col pb-0">
          <div
            id={bioId}
            className={cn(
              "relative min-h-0",
              isLongBio &&
                !expanded &&
                cn(COLLAPSED_BIO_HEIGHT_CLASS, "overflow-hidden"),
            )}
          >
            <ExpertBioContent bio={expert.bio} />
            {isLongBio && !expanded ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card via-card/90 to-transparent"
                aria-hidden
              />
            ) : null}
          </div>
        </CardContent>
        {isLongBio ? (
          <CardFooter className="mt-auto shrink-0 flex-col items-stretch border-border/50 bg-transparent pt-3">
            <button
              type="button"
              className="text-left text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
              aria-expanded={expanded}
              aria-controls={bioId}
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? "Свернуть" : "Читать полностью"}
            </button>
          </CardFooter>
        ) : null}
      </Card>
    </motion.div>
  );
}
