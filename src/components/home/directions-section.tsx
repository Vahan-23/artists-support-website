"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Mic2, type LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { landingContent } from "@/data/landing-content";

const directionIcons: Record<string, LucideIcon> = {
  grants: Award,
  education: GraduationCap,
  festivals: Mic2,
};

export function DirectionsSection() {
  const { directions } = landingContent;

  return (
    <section
      id="napravleniya"
      className="scroll-mt-header border-b border-border/40 bg-muted/25"
      aria-labelledby="directions-title"
    >
      <div className="section-shell section-y">
        <div className="section-head section-head-gap text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {directions.eyebrow}
          </p>
          <h2
            id="directions-title"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            {directions.title}
          </h2>
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
          {directions.items.map((item, index) => {
            const Icon = directionIcons[item.id] ?? Mic2;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card className="group h-full border-border/70 bg-card shadow-sm ring-1 ring-black/[0.03] transition-shadow hover:border-primary/20 hover:shadow-md">
                  <CardHeader className="space-y-3 pb-2 pt-6 sm:pt-7">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15 sm:size-11">
                      <Icon className="size-[1.125rem] sm:size-5" aria-hidden />
                    </span>
                    <CardTitle className="font-heading text-lg leading-snug sm:text-xl">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-6 text-sm leading-relaxed text-muted-foreground sm:pb-7 sm:text-[0.9375rem]">
                    <p>{item.intro}</p>
                    <p className="text-foreground/90">{item.listIntro}</p>
                    <ul className="space-y-2">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5">
                          <span
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                            aria-hidden
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    {item.outro ? <p>{item.outro}</p> : null}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
