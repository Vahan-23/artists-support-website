import type { Metadata } from "next";

import { PageIntro } from "@/components/motion/page-intro";
import { ParticipantsView } from "@/components/participants/participants-view";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Участники",
  description:
    "Молодые исполнители программы «Первый свет» — музыканты, вокалисты и актёры на пути к первой публичной сцене.",
  openGraph: {
    title: `Участники · ${siteConfig.name}`,
    description:
      "Знакомьтесь с артистами, которые готовят дебютные выступления при поддержке организации.",
  },
};

export default function ParticipantsPage() {
  return (
    <div className="border-b border-border/40 bg-muted/15">
      <div className="section-shell section-y">
        <PageIntro
          eyebrow="Сообщество"
          title="Участники"
          description="Актуальный состав артистов программы."
        />

        <div className="mt-10 sm:mt-12">
          <ParticipantsView />
        </div>
      </div>
    </div>
  );
}
