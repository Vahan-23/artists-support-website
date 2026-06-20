import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const siteUrl = siteConfig.url.replace(/\/$/, "");

export const seoKeywords = [
  siteConfig.name,
  siteConfig.shortName,
  "АНО Открытая сцена",
  "некоммерческая организация",
  "Москва",
  "культура",
  "образование",
  "сценическое искусство",
  "детское творчество",
  "юношеское творчество",
  "молодые таланты",
  "концертная деятельность",
  "образовательные проекты",
  "фестивали",
  "мастер-классы",
  "экспертный совет",
  "opnstage",
] as const;

const defaultOgImage = {
  url: "/og-image.png",
  width: 512,
  height: 512,
  alt: `${siteConfig.name} — логотип`,
} as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  /** Полный title без шаблона layout (для главной) */
  absoluteTitle?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "",
  absoluteTitle,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const canonicalUrl = `${siteUrl}${canonicalPath || "/"}`;
  const ogTitle = absoluteTitle ?? `${title} · ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords: [...seoKeywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: ogTitle,
      description,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary",
      title: ogTitle,
      description,
      images: [defaultOgImage.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.shortName,
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  keywords: [...seoKeywords],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "culture",
  icons: {
    icon: [{ url: "/logodark.png", type: "image/png" }],
    apple: [{ url: "/logodark.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.shortDescription,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.shortDescription,
    images: [defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    "geo.region": "RU-MOW",
    "geo.placename": "Москва",
  },
};
