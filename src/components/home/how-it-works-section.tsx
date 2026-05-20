"use client";

import { AnchorLink } from "@/components/layout/anchor-link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  HeartHandshake,
  Mic2,
  Users,
} from "lucide-react";

import { landingContent } from "@/data/landing-content";

const stepIcons = [HeartHandshake, Users, Mic2, GraduationCap] as const;

export function HowItWorksSection() {
  const { howItWorks } = landingContent;

  return (
    <section
      id="kak-eto-rabotaet"
      className="scroll-mt-header border-b border-border/40"
      aria-labelledby="how-title"
    >
      <div className="section-shell section-y">
        <div className="section-head section-head-gap text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {howItWorks.eyebrow}
          </p>
          <h2
            id="how-title"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            {howItWorks.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            {howItWorks.lead}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {howItWorks.steps.map((item, index) => {
            const Icon = stepIcons[index] ?? HeartHandshake;
            return (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-2xl border border-border/70 bg-card p-5 shadow-sm ring-1 ring-black/[0.03] sm:p-6"
              >
                <span className="absolute right-3 top-3 font-heading text-3xl font-bold tabular-nums leading-none text-primary/[0.07] sm:right-4 sm:top-4 sm:text-4xl">
                  {item.step}
                </span>
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm sm:size-11">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-wider text-primary sm:text-xs">
                  Шаг {item.step}
                </p>
                <h3 className="mt-1 font-heading text-base font-semibold leading-snug text-foreground sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-xl space-y-3 text-center sm:mt-10"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            {howItWorks.closing}
          </p>
          <p className="text-sm">
            <AnchorLink
              href="/#dlya-roditeley"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Информация для родителей
            </AnchorLink>
            {" · "}
            <AnchorLink
              href="/#kontakty"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Оставить заявку
            </AnchorLink>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
