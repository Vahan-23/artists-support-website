"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { siteConfig } from "@/lib/site-config";

const aboutImage = "/scrip3.jpg";

export function AboutSection() {
  return (
    <section
      id="o-nas"
      className="scroll-mt-20 border-b border-border/40 bg-muted/25"
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
            <blockquote className="rounded-xl border border-border/60 bg-card px-4 py-3.5 text-sm leading-relaxed text-muted-foreground sm:px-5 sm:py-4">
              <p className="font-heading text-base font-semibold text-foreground">
                Сцена доступна не только «избранным» — её можно построить бережно,
                по шагам.
              </p>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Кто мы
            </p>
            <h2
              id="about-title"
              className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Некоммерческая команда на стороне артиста
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
              {siteConfig.about}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-foreground/90 sm:mt-8 sm:space-y-3 sm:text-[0.9375rem]">
              <li className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                Репетиции и пробные выступления в камерном формате.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                Экспертный совет: практики индустрии, без менторства «сверху».
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                Для исполнителей без платы — за счёт партнёров и грантов.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
