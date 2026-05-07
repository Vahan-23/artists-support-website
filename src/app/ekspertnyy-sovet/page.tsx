import type { Metadata } from "next";

import { ExpertCard } from "@/components/experts/expert-card";
import { PageIntro } from "@/components/motion/page-intro";
import { experts } from "@/data/experts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Экспертный совет",
  description:
    "Независимые эксперты и наставники программы — звук, постановка, продюсирование, право и коммуникации.",
  openGraph: {
    title: `Экспертный совет · ${siteConfig.name}`,
    description:
      "Команда наставников, сопровождающая молодых исполнителей на пути к первой сцене.",
  },
};

export default function ExpertCouncilPage() {
  return (
    <div className="border-b border-border/40">
      <div className="section-shell section-y">
        <PageIntro
          eyebrow="Наставники"
          title="Экспертный совет"
          description="Практики сцены, звука и сопровождения проектов — чтобы дебют был спокойным и понятным."
        />

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {experts.map((expert, index) => (
            <ExpertCard key={expert.id} expert={expert} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
