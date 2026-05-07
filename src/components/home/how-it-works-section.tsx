"use client";

import { motion } from "framer-motion";

import { howItWorksSteps } from "@/data/home-sections";

export function HowItWorksSection() {
  return (
    <section
      id="kak-eto-rabotaet"
      className="scroll-mt-20 border-b border-border/40"
      aria-labelledby="how-title"
    >
      <div className="section-shell section-y">
        <div className="section-head section-head-gap text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            По шагам
          </p>
          <h2
            id="how-title"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Как это работает
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            От заявки до выступления — без скрытых этапов.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {howItWorksSteps.map((item, index) => {
            const Icon = item.icon;
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-lg text-center text-sm leading-relaxed text-muted-foreground sm:mt-10"
        >
          Сроки подстраиваем под вас.
        </motion.p>
      </div>
    </section>
  );
}
