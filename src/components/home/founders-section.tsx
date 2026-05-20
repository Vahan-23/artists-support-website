"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { landingContent } from "@/data/landing-content";

const foundersImage = "/scrip.jpg";

export function FoundersSection() {
  const { founders } = landingContent;

  return (
    <section
      id="uchrediteli"
      className="scroll-mt-20 border-b border-border/40 bg-muted/25"
      aria-labelledby="founders-title"
    >
      <div className="section-shell section-y">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {founders.eyebrow}
            </p>
            <h2
              id="founders-title"
              className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              {founders.title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
              {founders.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/[0.06] sm:rounded-3xl"
          >
            <Image
              src={foundersImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover contrast-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
