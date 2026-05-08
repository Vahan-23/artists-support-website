"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const { line1, accent, line2 } = siteConfig.heroHeading;

  return (
    <section
      className="relative overflow-hidden border-b border-border/50"
      aria-labelledby="hero-title"
    >
      <div
        className="hero-mesh pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-12 pt-0 sm:gap-12 sm:px-6 sm:pb-16 lg:min-h-[min(88vh,840px)] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-10 lg:px-8 lg:pb-16 xl:gap-14">
        {/* Текст */}
        <div className="relative flex flex-col justify-center pt-10 sm:pt-12 lg:py-14 xl:pr-2">
          <div
            className="hero-grid-paper pointer-events-none absolute inset-0 opacity-[0.28] sm:opacity-[0.35]"
            aria-hidden
          />
          <div className="relative max-w-xl lg:max-w-none xl:pr-4">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary sm:px-4 sm:text-[0.7rem]"
            >
              <span
                className="size-1.5 shrink-0 rounded-full bg-primary sm:size-2"
                aria-hidden
              />
              {siteConfig.heroEyebrow}
            </motion.div>

            <motion.h1
              id="hero-title"
              {...fadeUp}
              transition={{
                duration: 0.6,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-[20ch] font-display text-[2.125rem] font-semibold leading-[1.02] tracking-tight text-foreground sm:mt-7 sm:max-w-[22ch] sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4rem]"
            >
              <span className="block">{line1}</span>
              <span className="mt-1 block font-display text-[2.5rem] font-semibold italic leading-[1.08] tracking-tight text-primary sm:mt-1.5 sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[4.5rem]">
                {accent}
              </span>
              <span className="mt-3 block font-sans text-lg font-medium leading-snug tracking-normal text-foreground/90 sm:mt-4 sm:text-xl md:text-2xl">
                {line2}
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{
                duration: 0.5,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"
            >
              {siteConfig.heroLead}
            </motion.p>

            <motion.ul
              className="mt-6 flex max-w-xl flex-col gap-2.5 sm:mt-8 sm:gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.4 }}
            >
              {siteConfig.heroBullets.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.05,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex gap-2.5 text-sm leading-snug text-foreground/90 sm:text-[0.9375rem] sm:leading-relaxed"
                >
                  <CheckCircle2
                    className="mt-0.5 size-[1.125rem] shrink-0 text-primary sm:size-5"
                    aria-hidden
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.22,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Link
                href="/#kak-eto-rabotaet"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-6 text-[0.9375rem] shadow-lg shadow-primary/20 sm:h-12 sm:w-auto sm:rounded-2xl sm:px-8",
                )}
              >
                Как это работает
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#kontakty"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "inline-flex h-11 w-full items-center justify-center rounded-xl border-border/90 bg-card/90 px-6 text-[0.9375rem] sm:h-12 sm:w-auto sm:rounded-2xl sm:px-7",
                )}
              >
                Оставить заявку
              </Link>
              <Link
                href="/ekspertnyy-sovet"
                className="inline-flex items-center justify-center gap-1.5 py-2 text-center text-sm font-semibold text-primary underline-offset-4 hover:underline sm:inline-flex sm:justify-start sm:py-0 sm:pl-2"
              >
                Наставники
                <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-10 grid grid-cols-3 gap-2 border-t border-border/70 pt-8 sm:mt-12 sm:gap-4 sm:pt-10"
            >
              {siteConfig.impactStats.map((stat) => (
                <div key={stat.label} className="min-w-0 text-center sm:text-left">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="flex flex-col gap-0.5 sm:gap-1">
                    <span className="font-display text-xl font-semibold tracking-tight text-foreground tabular-nums sm:text-2xl md:text-3xl">
                      {stat.value}
                    </span>
                    <span className="text-[0.65rem] leading-tight text-muted-foreground sm:text-xs md:text-sm">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>

        {/* Фото — на lg без отступа сверху; блок тянется по высоте колонки */}
        <div className="relative flex min-h-[min(52vh,380px)] flex-col lg:h-full lg:min-h-[min(88vh,840px)]">
          <div
            className="hero-stage-panel absolute inset-0 lg:rounded-bl-[2rem] xl:rounded-bl-[2.5rem]"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-[1] flex min-h-0 w-full flex-1 flex-col lg:mb-8"
          >
            <div className="relative aspect-[4/5] w-full max-w-md shrink-0 overflow-hidden rounded-2xl shadow-[0_28px_56px_-20px_oklch(0.02_0_0/0.75)] ring-1 ring-white/10 sm:mx-auto sm:max-w-lg sm:rounded-3xl lg:mx-0 lg:aspect-auto lg:h-full lg:min-h-0 lg:max-w-none lg:flex-1 lg:rounded-none lg:rounded-bl-[2rem] xl:rounded-bl-[2.5rem]">
              <Image
                src="/scrip2.jpg"
                alt="Фрагмент скрипки"
                fill
                priority
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 80vw, 100vw"
                className="object-cover contrast-110 brightness-90"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="mx-auto mt-4 w-full max-w-md rounded-xl border border-white/12 bg-black/75 p-3.5 shadow-lg backdrop-blur-md sm:max-w-lg sm:p-4 lg:absolute lg:bottom-5 lg:left-5 lg:right-5 lg:mx-0 lg:mt-0 lg:max-w-none"
            >
              <p className="font-heading text-sm font-semibold text-white sm:text-base">
                Без жёсткого отбора
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/75 sm:text-sm">
                Начинаем с диалога — без конкурсного отсева на входе.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
