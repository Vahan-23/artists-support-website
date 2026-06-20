import { siteConfig } from "@/lib/site-config";
import { siteUrl } from "@/lib/seo";

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NGO",
      "@id": organizationId,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      url: siteUrl,
      logo: `${siteUrl}/logodark.png`,
      image: `${siteUrl}/og-image.png`,
      description: siteConfig.shortDescription,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "пр-д Ольминского, д. 7, оф. 312",
        addressLocality: "Москва",
        postalCode: "129085",
        addressCountry: "RU",
      },
      areaServed: {
        "@type": "City",
        name: "Москва",
      },
      sameAs: [siteConfig.social.telegram, siteConfig.social.vk],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.shortDescription,
      inLanguage: "ru-RU",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.shortDescription,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      inLanguage: "ru-RU",
    },
  ],
};

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
