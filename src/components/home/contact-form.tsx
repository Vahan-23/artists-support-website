"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from "react-hook-form";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useRef } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

function getFirstErrorMessage(
  errors: Record<string, { message?: string } | undefined>,
): string | undefined {
  for (const field of Object.values(errors)) {
    if (field?.message) return field.message;
  }
  return undefined;
}

export function ContactForm() {
  const honeypotRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    if (honeypotRef.current?.value?.trim()) {
      toast.success("Сообщение отправлено");
      reset();
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        toast.error(data.error ?? "Не удалось отправить сообщение");
        return;
      }

      toast.success("Сообщение отправлено", {
        description:
          "Спасибо, мы получили ваше обращение и скоро свяжемся с вами.",
      });
      reset();
      if (honeypotRef.current) honeypotRef.current.value = "";
    } catch {
      toast.error("Ошибка сети", {
        description: "Проверьте подключение к интернету и попробуйте снова.",
      });
    }
  };

  const onInvalid = (fieldErrors: FieldErrors<ContactFormValues>) => {
    const message = getFirstErrorMessage(
      fieldErrors as Record<string, { message?: string } | undefined>,
    );
    toast.error(message ?? "Заполните все обязательные поля");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="relative space-y-5 rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:space-y-6 sm:p-8"
      noValidate
    >
      <input
        ref={honeypotRef}
        type="text"
        name="company_address"
        tabIndex={-1}
        autoComplete="nope"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="space-y-2">
        <Label htmlFor="contact-name">Имя</Label>
        <Input
          id="contact-name"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          aria-invalid={!!errors.name}
          className={cn("h-10", errors.name && "border-destructive")}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          className={cn("h-10", errors.email && "border-destructive")}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Сообщение</Label>
        <Textarea
          id="contact-message"
          placeholder="Расскажите, чем мы можем помочь"
          rows={5}
          aria-invalid={!!errors.message}
          className={cn(
            "min-h-[120px] resize-y",
            errors.message && "border-destructive",
          )}
          {...register("message")}
        />
        {errors.message ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <Controller
        name="consent"
        control={control}
        render={({ field }) => (
          <div className="flex gap-3">
            <Checkbox
              id="contact-consent"
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v === true)}
              className="mt-0.5 cursor-pointer"
              aria-invalid={!!errors.consent}
            />
            <Label
              htmlFor="contact-consent"
              className="cursor-pointer text-sm font-normal leading-snug text-muted-foreground"
            >
              Я согласен(на) на обработку персональных данных в соответствии с
              политикой конфиденциальности организации.
            </Label>
          </div>
        )}
      />
      {errors.consent ? (
        <p className="text-sm text-destructive" role="alert">
          {errors.consent.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "h-11 w-full cursor-pointer rounded-xl sm:w-auto sm:min-w-[200px]",
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2Icon
              className="size-4 animate-spin"
              data-icon="inline-start"
            />
            Отправка…
          </>
        ) : (
          "Отправить"
        )}
      </button>
    </form>
  );
}
