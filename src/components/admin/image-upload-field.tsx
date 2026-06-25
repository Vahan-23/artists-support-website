"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { CameraIcon, Loader2Icon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder: "participants" | "experts";
};

export function ImageUploadField({
  label = "Фотография",
  value,
  onChange,
  folder,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrl, setShowUrl] = useState(Boolean(value && !value.startsWith("/uploads/")));

  const upload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Не удалось загрузить");
      }
      onChange(data.url);
      setShowUrl(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-border/80 bg-muted/30 px-4 py-6 transition-colors hover:border-primary/40 hover:bg-muted/50",
          uploading && "pointer-events-none opacity-70",
        )}
      >
        {value ? (
          <div className="relative size-28 overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
            <Image
              src={value}
              alt="Превью"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
        ) : (
          <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            {uploading ? (
              <Loader2Icon className="size-7 animate-spin" />
            ) : (
              <CameraIcon className="size-7" />
            )}
          </span>
        )}
        <span className="text-center text-sm font-medium text-foreground">
          {uploading
            ? "Загрузка…"
            : value
              ? "Нажмите, чтобы заменить фото"
              : "Нажмите, чтобы выбрать фото"}
        </span>
        <span className="text-xs text-muted-foreground">JPG, PNG или WebP до 5 МБ</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => setShowUrl((v) => !v)}
        className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        {showUrl ? "Скрыть ссылку" : "Или вставить ссылку на фото"}
      </button>
      {showUrl ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... или /expertsPhoto/..."
        />
      ) : null}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
