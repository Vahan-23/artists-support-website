"use client";

import { motion } from "framer-motion";

import { landingContent } from "@/data/landing-content";

export function MissionSection() {
  const { mission } = landingContent;

  return (
    <section
      id="missiya"
      className="scroll-mt-20 border-b border-border/40"
      aria-labelledby="mission-title"
    >
      <div className="section-shell section-y">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="section-head section-head-gap mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {mission.eyebrow}
          </p>
          <h2
            id="mission-title"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            {mission.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
            {mission.text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
