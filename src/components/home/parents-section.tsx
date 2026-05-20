"use client";

import { AnchorLink } from "@/components/layout/anchor-link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { landingContent } from "@/data/landing-content";
import { cn } from "@/lib/utils";

export function ParentsSection() {
  const { parents } = landingContent;

  return (
    <section
      id="dlya-roditeley"
      className="scroll-mt-header border-b border-border/40"
      aria-labelledby="parents-title"
    >
      <div className="section-shell section-y">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.04] sm:rounded-3xl"
        >
          <div className="border-b border-primary/10 px-6 py-6 sm:px-8 sm:py-7 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {parents.eyebrow}
            </p>
            <h2
              id="parents-title"
              className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {parents.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {parents.intro} {parents.body}
            </p>
          </div>

          <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-7 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-8">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {parents.listIntro}
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {parents.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 rounded-xl border border-border/60 bg-card/80 px-4 py-3.5 text-sm leading-snug text-foreground/90"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-xl border border-border/50 bg-card/60 p-5 sm:p-6">
              <p className="text-base leading-relaxed text-muted-foreground">
                {parents.closing}
              </p>
              <AnchorLink
                href="/#kontakty"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl sm:h-12 sm:w-auto sm:self-start",
                )}
              >
                Связаться с нами
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </AnchorLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
