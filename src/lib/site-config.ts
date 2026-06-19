import { landingContent } from "@/data/landing-content";

export const siteConfig = {
  /** Базовый URL сайта для Open Graph и canonical (задайте в продакшене). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  name: landingContent.legalName,
  shortName: landingContent.shortName,
  tagline: landingContent.tagline,
  shortDescription: landingContent.hero.lead,
  heroLead: landingContent.hero.lead,
  heroTags: landingContent.hero.tags,
  mission: landingContent.mission.text,
  about: landingContent.about.paragraphs.join(" "),
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
    "info@opnstage.ru",
  phone: "+7 (985) 723-23-49",
  address: "Москва, набережная примерная, 1",
  social: {
    telegram: "https://t.me/otkrytaya_scena",
    vk: "https://vk.com/otkrytaya_scena",
  },
} as const;
