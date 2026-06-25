import { z } from "zod";

export const participantInputSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().trim().min(2, "Введите имя"),
  bio: z.string().trim().min(10, "Добавьте описание"),
  imageSrc: z.string().trim().min(1, "Укажите фото"),
});

export const expertTimelineSchema = z.object({
  period: z.string().trim().min(1),
  text: z.string().trim().min(1),
});

export const expertHighlightSchema = z.object({
  year: z.string().trim().optional(),
  text: z.string().trim().min(1),
});

export const expertBioSchema = z.object({
  lead: z.string().trim().optional(),
  timelineLabel: z.string().trim().optional(),
  timeline: z.array(expertTimelineSchema).optional(),
  paragraphs: z.array(z.string().trim().min(1)).optional(),
  highlightsLabel: z.string().trim().optional(),
  highlights: z.array(expertHighlightSchema).optional(),
  tagsLabel: z.string().trim().optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
});

export const expertInputSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().trim().min(2, "Введите имя"),
  role: z.string().trim().min(2, "Укажите должность"),
  imageSrc: z.string().trim().min(1, "Укажите фото"),
  bio: expertBioSchema.default({}),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});
