import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  DEFAULT_EXPERT_BIO_SECTION_ORDER,
  type ExpertBio,
  type ExpertBioSection,
} from "@/data/experts";

type ExpertBioContentProps = {
  bio: ExpertBio;
  className?: string;
};

function BioSectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
      {children}
    </p>
  );
}

function BioTimeline({ bio }: { bio: ExpertBio }) {
  if (!bio.timeline?.length) return null;

  return (
    <div className="space-y-2">
      {bio.timelineLabel ? (
        <BioSectionLabel>{bio.timelineLabel}</BioSectionLabel>
      ) : null}
      <ul
        className="space-y-2"
        aria-label={bio.timelineLabel ?? "Образование и карьера"}
      >
        {bio.timeline.map((item) => (
          <li key={`${item.period}-${item.text}`} className="flex gap-2.5">
            <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-[0.7rem] font-semibold leading-tight tracking-wide text-primary tabular-nums">
              {item.period}
            </span>
            <span className="min-w-0 leading-snug text-muted-foreground">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BioHighlights({ bio }: { bio: ExpertBio }) {
  if (!bio.highlights?.length) return null;

  return (
    <div className="space-y-2">
      {bio.highlightsLabel ? (
        <BioSectionLabel>{bio.highlightsLabel}</BioSectionLabel>
      ) : null}
      <ul
        className="space-y-2 border-l-2 border-primary/25 pl-3"
        aria-label={bio.highlightsLabel ?? "Знаковые события"}
      >
        {bio.highlights.map((item) => (
          <li key={`${item.year ?? ""}-${item.text}`} className="leading-snug">
            {item.year ? (
              <span className="mr-1.5 font-semibold text-foreground tabular-nums">
                {item.year}
              </span>
            ) : null}
            <span className="text-muted-foreground">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BioParagraphs({ bio }: { bio: ExpertBio }) {
  if (!bio.paragraphs?.length) return null;

  return (
    <>
      {bio.paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="leading-relaxed text-muted-foreground"
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}

function BioTags({ bio }: { bio: ExpertBio }) {
  if (!bio.tags?.length) return null;

  return (
    <div className="space-y-1.5 pt-0.5">
      {bio.tagsLabel ? <BioSectionLabel>{bio.tagsLabel}</BioSectionLabel> : null}
      <div className="flex flex-wrap gap-1.5">
        {bio.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

const SECTION_RENDERERS: Record<
  ExpertBioSection,
  (bio: ExpertBio) => ReactNode
> = {
  lead: (bio) =>
    bio.lead ? (
      <p className="leading-relaxed text-foreground/90">{bio.lead}</p>
    ) : null,
  timeline: (bio) => <BioTimeline bio={bio} />,
  paragraphs: (bio) => <BioParagraphs bio={bio} />,
  highlights: (bio) => <BioHighlights bio={bio} />,
  tags: (bio) => <BioTags bio={bio} />,
};

export function ExpertBioContent({ bio, className }: ExpertBioContentProps) {
  const order = bio.sectionOrder ?? DEFAULT_EXPERT_BIO_SECTION_ORDER;

  return (
    <div className={cn("space-y-3.5 text-sm", className)}>
      {order.map((section) => {
        const node = SECTION_RENDERERS[section](bio);
        return node ? <div key={section}>{node}</div> : null;
      })}
    </div>
  );
}

export function expertBioIsLong(bio: ExpertBio): boolean {
  const blocks =
    (bio.lead ? 1 : 0) +
    (bio.timeline?.length ?? 0) +
    (bio.paragraphs?.length ?? 0) +
    (bio.highlights?.length ?? 0);
  return blocks > 3 || (bio.timeline?.length ?? 0) >= 2;
}
