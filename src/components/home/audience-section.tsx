"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { audienceCards } from "@/data/home-sections";

export function AudienceSection() {
  return (
    <section
      id="komu-my-pomogaem"
      className="scroll-mt-20 border-b border-border/40 bg-muted/25"
      aria-labelledby="audience-title"
    >
      <div className="section-shell section-y">
        <div className="section-head section-head-gap text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            С первого взгляда
          </p>
          <h2
            id="audience-title"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Это для вас, если…
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            Три типичных ситуации. Узнали себя — напишите в форме внизу страницы.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {audienceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
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
                    <CardTitle className="font-heading text-lg leading-snug">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 pt-0">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
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
