"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import {
  AdminFormActions,
  AdminFormCard,
  AdminFormHeader,
} from "@/components/admin/admin-form-chrome";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { encodeRouteId } from "@/lib/cms/ids";
import type { Participant } from "@/types/cms";

const FORM_ID = "participant-form";

type ParticipantFormProps = {
  initial?: Participant;
  headerActions?: ReactNode;
};

export function ParticipantForm({ initial, headerActions }: ParticipantFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const listHref = "/admin/participants";
  const [name, setName] = useState(initial?.name ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [imageSrc, setImageSrc] = useState(initial?.imageSrc ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const body = { name, bio, imageSrc };
    const url = isEdit
      ? `/api/admin/participants/${encodeRouteId(initial!.id)}`
      : "/api/admin/participants";
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
        backLabel="Участники"
        title={isEdit ? "Изменить участника" : "Новый участник"}
        description="Имя, короткое описание и фото — этого достаточно для карточки на сайте."
        actions={headerActions}
      />

      <AdminFormCard>
        <form id={FORM_ID} onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="p-name">Имя</Label>
            <Input
              id="p-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Полина М."
              required
              autoFocus
            />
          </div>

          <ImageUploadField
            value={imageSrc}
            onChange={setImageSrc}
            folder="participants"
          />

          <div className="space-y-2">
            <Label htmlFor="p-bio">Описание</Label>
            <Textarea
              id="p-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Кратко: чем занимается, что готовит к выступлению"
              required
            />
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
