"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { landingContent } from "@/data/landing-content";

const aboutImage = "/scrip3.jpg";

export function AboutSection() {
  const { about, mission } = landingContent;

  return (
    <section
      id="o-proekte"
      className="scroll-mt-header border-b border-border/40"
      aria-labelledby="about-title"
    >
      <div className="section-shell section-y">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 space-y-4 lg:order-1"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/[0.06] sm:rounded-3xl">
              <Image
                src={aboutImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover grayscale contrast-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 space-y-6 lg:order-2"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {about.eyebrow}
              </p>
              <h2
                id="about-title"
                className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
              >
                {about.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div
              id="missiya"
              className="scroll-mt-header rounded-2xl border border-primary/15 bg-primary/[0.04] px-5 py-5 sm:px-6 sm:py-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {mission.eyebrow}
              </p>
              <p className="mt-3 text-base leading-relaxed text-foreground/90 sm:text-lg">
                {mission.text}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
