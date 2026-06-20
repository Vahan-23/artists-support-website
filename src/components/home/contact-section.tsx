"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/home/contact-form";
import { AddressRouteButton } from "@/components/home/address-route-button";
import { landingContent } from "@/data/landing-content";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  return (
    <section
      id="kontakty"
      className="scroll-mt-header"
      aria-labelledby="contact-title"
    >
      <div className="section-shell section-y">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="section-head section-head-gap text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Контакты
          </p>
          <h2
            id="contact-title"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Напишите нам
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            {landingContent.contact.lead}
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <ul className="space-y-5">
              <li className="flex gap-3 sm:gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-11">
                  <Mail className="size-[1.125rem] sm:size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-0.5 block text-sm font-medium text-foreground underline-offset-4 hover:underline sm:text-base"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3 sm:gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-11">
                  <Phone className="size-[1.125rem] sm:size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Телефон
                  </p>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s|\(|\)|-/g, "")}`}
                    className="mt-0.5 block text-sm font-medium text-foreground underline-offset-4 hover:underline sm:text-base"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-3 sm:gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-11">
                  <MapPin className="size-[1.125rem] sm:size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Адрес
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-foreground sm:text-base">
                    {siteConfig.address}
                  </p>
                  <AddressRouteButton address={siteConfig.address} />
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
