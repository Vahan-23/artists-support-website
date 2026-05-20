"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { landingContent } from "@/data/landing-content";
import { cn } from "@/lib/utils";

export function ExpertCouncilTeaser() {
  const { expertCouncil } = landingContent;

  return (
    <section
      id="ekspertnyy-sovet"
      className="scroll-mt-20 border-b border-border/40"
      aria-labelledby="expert-council-title"
    >
      <div className="section-shell section-y">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {expertCouncil.eyebrow}
          </p>
          <h2
            id="expert-council-title"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            {expertCouncil.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
            {expertCouncil.intro}
          </p>
          <p className="mt-6 text-sm font-medium text-foreground sm:text-base">
            {expertCouncil.listIntro}
          </p>
          <ul className="mt-4 space-y-2.5">
            {expertCouncil.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/ekspertnyy-sovet"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "group mt-8 inline-flex h-11 items-center gap-2 rounded-xl px-6 sm:h-12 sm:rounded-2xl",
            )}
          >
            {expertCouncil.ctaLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
