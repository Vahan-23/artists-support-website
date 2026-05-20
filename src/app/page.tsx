import type { Metadata } from "next";

import { AboutSection } from "@/components/home/about-section";
import { AudienceSection } from "@/components/home/audience-section";
import { ContactSection } from "@/components/home/contact-section";
import { DirectionsSection } from "@/components/home/directions-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { OrganizationSection } from "@/components/home/organization-section";
import { ParentsSection } from "@/components/home/parents-section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Главная",
  description: siteConfig.shortDescription,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AudienceSection />
      <HowItWorksSection />
      <DirectionsSection />
      <ParentsSection />
      <OrganizationSection />
      <ContactSection />
    </>
  );
}
