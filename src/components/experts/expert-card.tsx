"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Expert } from "@/data/experts";

type ExpertCardProps = {
  expert: Expert;
  index: number;
};

export function ExpertCard({ expert, index }: ExpertCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card className="group h-full overflow-hidden border-border/70 bg-card/80 shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.06]">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={expert.imageSrc}
            alt={`Портрет: ${expert.name}`}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <CardHeader className="gap-1.5 pb-2 pt-5">
          <CardTitle className="font-heading text-lg leading-snug transition-colors group-hover:text-primary">
            {expert.name}
          </CardTitle>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary/90">
            {expert.role}
          </p>
        </CardHeader>
        <CardContent className="pb-6">
          <CardDescription className="text-sm leading-relaxed text-muted-foreground">
            {expert.bio}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}
