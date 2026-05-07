"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, Users } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/ekspertnyy-sovet",
    title: "Экспертный совет",
    description:
      "Звук, постановка, право, PR — коротко о каждом наставнике.",
    icon: GraduationCap,
  },
  {
    href: "/uchastniki",
    title: "Участники",
    description:
      "Кто готовит первый выход в программе.",
    icon: Users,
  },
] as const;

export function ExploreSection() {
  return (
    <section
      className="border-b border-border/40 bg-muted/20"
      aria-labelledby="explore-title"
    >
      <div className="section-shell py-12 sm:py-14 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Ещё на сайте
            </p>
            <h2
              id="explore-title"
              className="mt-1.5 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl"
            >
              Куда заглянуть дальше
            </h2>
          </div>
          <Link
            href="/#kontakty"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "h-10 w-full shrink-0 rounded-xl sm:w-auto",
            )}
          >
            Заявка
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
          {links.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-32px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm ring-1 ring-black/[0.03] transition-colors",
                    "hover:border-primary/25 hover:shadow-md",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-muted text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-primary" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
