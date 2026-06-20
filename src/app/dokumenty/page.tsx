import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";

import { PageIntro } from "@/components/motion/page-intro";
import {
  getDocumentHref,
  legalDocuments,
} from "@/data/legal-documents";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Документы",
  description:
    "Политика конфиденциальности и документы по обработке персональных данных АНО «Открытая сцена».",
  openGraph: {
    title: `Документы · ${siteConfig.name}`,
    description:
      "Официальные документы организации: политика конфиденциальности, положение и форма согласия на обработку персональных данных.",
  },
};

export default function DocumentsPage() {
  return (
    <div className="border-b border-border/40 bg-muted/15">
      <div className="section-shell section-y">
        <PageIntro
          eyebrow="Правовая информация"
          title="Документы"
          description="Официальные документы организации в формате PDF. Файлы открываются в новой вкладке браузера."
        />

        <ul className="mt-10 space-y-4 sm:mt-12">
          {legalDocuments.map((document) => (
            <li key={document.id}>
              <a
                href={getDocumentHref(document.filename)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-colors hover:border-primary/30 hover:bg-card/90 sm:gap-5 sm:p-6"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
                      {document.title}
                    </span>
                    <ExternalLink
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                    {document.description}
                  </span>
                  <span className="mt-3 inline-block text-sm font-medium text-primary">
                    Открыть PDF
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
