"use client";

import Image from "next/image";
import Link from "next/link";

import { AnchorLink } from "@/components/layout/anchor-link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { landingContent } from "@/data/landing-content";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const { hero } = landingContent;

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
        <div className="relative flex flex-col justify-center pt-10 sm:pt-12 lg:py-14 xl:pr-2">
          <div
            className="hero-grid-paper pointer-events-none absolute inset-0 opacity-[0.28] sm:opacity-[0.35]"
            aria-hidden
          />
          <div className="relative max-w-xl lg:max-w-none xl:pr-4">
            <motion.h1
              id="hero-title"
              {...fadeUp}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-xl"
            >
              <span className="block font-display text-[2.5rem] font-medium italic leading-[1.08] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                {hero.titleLine2}
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{
                duration: 0.5,
                delay: 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg"
            >
              {hero.lead}
            </motion.p>

            <motion.p
              {...fadeUp}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-3 text-sm leading-relaxed text-muted-foreground/85"
            >
              {hero.tags}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.14,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 sm:mt-10"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <AnchorLink
                  href="/#kak-eto-rabotaet"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-6 sm:h-12 sm:w-auto sm:min-w-[11rem] sm:rounded-2xl",
                  )}
                >
                  Как участвовать
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </AnchorLink>
                <AnchorLink
                  href="/#kontakty"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "inline-flex h-11 w-full items-center justify-center rounded-xl px-6 sm:h-12 sm:w-auto sm:min-w-[11rem] sm:rounded-2xl",
                  )}
                >
                  Написать нам
                </AnchorLink>
              </div>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <AnchorLink
                  href="/#o-proekte"
                  className="font-medium text-foreground/80 underline-offset-4 hover:text-foreground hover:underline"
                >
                  О проекте
                </AnchorLink>
                <AnchorLink
                  href="/#dlya-roditeley"
                  className="font-medium text-foreground/80 underline-offset-4 hover:text-foreground hover:underline"
                >
                  Для родителей
                </AnchorLink>
              </p>
            </motion.div>
          </div>
        </div>

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
                alt=""
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
                {landingContent.tagline}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/75 sm:text-sm">
                Концертная практика, образование и фестивали для молодых
                талантов.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
