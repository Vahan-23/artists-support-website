"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { landingContent } from "@/data/landing-content";
import { cn } from "@/lib/utils";

const foundersImage = "/scrip.jpg";

export function OrganizationSection() {
  const { founders, expertCouncil } = landingContent;

  return (
    <section
      className="scroll-mt-header border-b border-border/40 bg-muted/25"
      aria-labelledby="organization-title"
    >
      <div className="section-shell section-y">
        <div className="section-head section-head-gap text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Организация
          </p>
          <h2
            id="organization-title"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Кто стоит за проектом
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <motion.article
            id="uchrediteli"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="scroll-mt-header overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm ring-1 ring-black/[0.03] sm:rounded-3xl"
          >
            <div className="relative aspect-[21/9] sm:aspect-[2/1]">
              <Image
                src={foundersImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover contrast-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {founders.eyebrow}
              </p>
              <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                {founders.title}
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {founders.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            id="ekspertnyy-sovet"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="scroll-mt-header flex flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm ring-1 ring-black/[0.03] sm:rounded-3xl sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {expertCouncil.eyebrow}
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-foreground sm:text-2xl">
              {expertCouncil.title}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {expertCouncil.intro}
            </p>
            <p className="mt-5 text-sm font-medium text-foreground">
              {expertCouncil.listIntro}
            </p>
            <ul className="mt-3 space-y-2">
              {expertCouncil.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
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
                "group mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl sm:w-auto sm:rounded-2xl",
              )}
            >
              {expertCouncil.ctaLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
