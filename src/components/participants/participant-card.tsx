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
import type { Participant } from "@/data/participants";

type ParticipantCardProps = {
  participant: Participant;
  index: number;
};

export function ParticipantCard({ participant, index }: ParticipantCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.35,
        delay: index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card className="group h-full overflow-hidden border-border/70 bg-card shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:border-primary/20 hover:shadow-md hover:shadow-primary/[0.05]">
        <div className="relative aspect-square overflow-hidden bg-muted sm:aspect-[5/4]">
          <Image
            src={participant.imageSrc}
            alt={`${participant.name}, участник`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 100vw"
            className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <CardHeader className="pb-2 pt-5">
          <CardTitle className="font-heading text-lg leading-snug">
            {participant.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <CardDescription className="text-sm leading-relaxed">
            {participant.bio}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}
