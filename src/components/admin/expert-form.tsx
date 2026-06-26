"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ChevronDownIcon, PlusIcon, Trash2Icon } from "lucide-react";

import {
  AdminFormActions,
  AdminFormCard,
  AdminFormHeader,
} from "@/components/admin/admin-form-chrome";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Expert, ExpertBio, ExpertHighlight, ExpertTimelineItem } from "@/types/cms";
import { encodeRouteId } from "@/lib/cms/ids";
import { cn } from "@/lib/utils";

const FORM_ID = "expert-form";

type ExpertFormProps = {
  initial?: Expert;
  headerActions?: ReactNode;
};

function paragraphsToText(paragraphs?: string[]) {
  return (paragraphs ?? []).join("\n\n");
}

function textToParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function ExpertForm({ initial, headerActions }: ExpertFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const listHref = "/admin/experts";
  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [imageSrc, setImageSrc] = useState(initial?.imageSrc ?? "");
  const [lead, setLead] = useState(initial?.bio.lead ?? "");
  const [bioText, setBioText] = useState(
    paragraphsToText(initial?.bio.paragraphs),
  );
  const [timeline, setTimeline] = useState<ExpertTimelineItem[]>(
    initial?.bio.timeline ?? [],
  );
  const [highlights, setHighlights] = useState<ExpertHighlight[]>(
    initial?.bio.highlights ?? [],
  );
  const [tags, setTags] = useState((initial?.bio.tags ?? []).join(", "));
  const [showDetails, setShowDetails] = useState(
    Boolean(
      (initial?.bio.timeline?.length ?? 0) > 0 ||
        (initial?.bio.highlights?.length ?? 0) > 0 ||
        (initial?.bio.tags?.length ?? 0) > 0,
    ),
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const bio: ExpertBio = {
      lead: lead.trim() || undefined,
      paragraphs: textToParagraphs(bioText),
      timeline: timeline.filter((t) => t.period.trim() && t.text.trim()),
      highlights: highlights.filter((h) => h.text.trim()),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      timelineLabel: initial?.bio.timelineLabel,
      highlightsLabel: initial?.bio.highlightsLabel,
      tagsLabel: initial?.bio.tagsLabel,
    };

    const body = { name, role, imageSrc, bio };
    const url = isEdit
      ? `/api/admin/experts/${encodeRouteId(initial!.id)}`
      : "/api/admin/experts";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Не удалось сохранить");
      router.push(listHref);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminFormHeader
        backHref={listHref}
        backLabel="Эксперты"
        title={isEdit ? "Изменить эксперта" : "Новый эксперт"}
        description="Заполните основное — остальное можно добавить позже."
        actions={headerActions}
      />

      <AdminFormCard>
        <form id={FORM_ID} onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="e-name">ФИО</Label>
            <Input
              id="e-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иванов Иван Иванович"
              required
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="e-role">Должность</Label>
            <Input
              id="e-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Педагог, профессор…"
              required
            />
          </div>

          <ImageUploadField
            value={imageSrc}
            onChange={setImageSrc}
            folder="experts"
          />

          <div className="space-y-2">
            <Label htmlFor="e-lead">Краткая строка под именем (необязательно)</Label>
            <Input
              id="e-lead"
              value={lead}
              onChange={(e) => setLead(e.target.value)}
              placeholder="Род. 1981, Москва"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="e-bio">Текст биографии</Label>
            <Textarea
              id="e-bio"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              rows={6}
              placeholder="Основной текст на карточке. Абзацы — через пустую строку."
            />
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/20">
            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              className="flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium"
            >
              <span>Годы, награды и ученики (необязательно)</span>
              <ChevronDownIcon
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform",
                  showDetails && "rotate-180",
                )}
              />
            </button>

            {showDetails ? (
              <div className="space-y-4 border-t border-border/60 px-4 py-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label className="text-sm">Хронология</Label>
                    <button
                      type="button"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "cursor-pointer gap-1",
                      )}
                      onClick={() =>
                        setTimeline((items) => [...items, { period: "", text: "" }])
                      }
                    >
                      <PlusIcon className="size-3.5" /> Добавить
                    </button>
                  </div>
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Год"
                        value={item.period}
                        onChange={(e) =>
                          setTimeline((items) =>
                            items.map((row, i) =>
                              i === index ? { ...row, period: e.target.value } : row,
                            ),
                          )
                        }
                        className="w-28 shrink-0"
                      />
                      <Input
                        placeholder="Событие"
                        value={item.text}
                        onChange={(e) =>
                          setTimeline((items) =>
                            items.map((row, i) =>
                              i === index ? { ...row, text: e.target.value } : row,
                            ),
                          )
                        }
                      />
                      <button
                        type="button"
                        aria-label="Удалить"
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "cursor-pointer shrink-0",
                        )}
                        onClick={() =>
                          setTimeline((items) => items.filter((_, i) => i !== index))
                        }
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label className="text-sm">Награды</Label>
                    <button
                      type="button"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "cursor-pointer gap-1",
                      )}
                      onClick={() =>
                        setHighlights((items) => [...items, { text: "" }])
                      }
                    >
                      <PlusIcon className="size-3.5" /> Добавить
                    </button>
                  </div>
                  {highlights.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Год"
                        value={item.year ?? ""}
                        onChange={(e) =>
                          setHighlights((items) =>
                            items.map((row, i) =>
                              i === index ? { ...row, year: e.target.value } : row,
                            ),
                          )
                        }
                        className="w-24 shrink-0"
                      />
                      <Input
                        placeholder="Награда"
                        value={item.text}
                        onChange={(e) =>
                          setHighlights((items) =>
                            items.map((row, i) =>
                              i === index ? { ...row, text: e.target.value } : row,
                            ),
                          )
                        }
                      />
                      <button
                        type="button"
                        aria-label="Удалить"
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "cursor-pointer shrink-0",
                        )}
                        onClick={() =>
                          setHighlights((items) =>
                            items.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="e-tags" className="text-sm">
                    Ученики / теги (через запятую)
                  </Label>
                  <Input
                    id="e-tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="К. Лифшиц, А. Кобрин"
                  />
                </div>
              </div>
            ) : null}
          </div>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </AdminFormCard>

      <AdminFormActions
        cancelHref={listHref}
        formId={FORM_ID}
        saveLabel={isEdit ? "Сохранить" : "Добавить"}
        saving={saving}
      />
    </>
  );
}
