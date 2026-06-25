export type Participant = {
  id: string;
  name: string;
  bio: string;
  imageSrc: string;
};

export type ExpertTimelineItem = {
  period: string;
  text: string;
};

export type ExpertHighlight = {
  year?: string;
  text: string;
};

export type ExpertBioSection =
  | "lead"
  | "timeline"
  | "paragraphs"
  | "highlights"
  | "tags";

export const DEFAULT_EXPERT_BIO_SECTION_ORDER: ExpertBioSection[] = [
  "lead",
  "timeline",
  "paragraphs",
  "highlights",
  "tags",
];

export type ExpertBio = {
  lead?: string;
  timeline?: ExpertTimelineItem[];
  timelineLabel?: string;
  paragraphs?: string[];
  highlights?: ExpertHighlight[];
  highlightsLabel?: string;
  tags?: string[];
  tagsLabel?: string;
  sectionOrder?: ExpertBioSection[];
};

export type Expert = {
  id: string;
  name: string;
  role: string;
  bio: ExpertBio;
  imageSrc: string;
};
