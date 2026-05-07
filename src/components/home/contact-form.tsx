"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z
    .string()
    .min(2, "Введите имя (не менее 2 символов)")
    .max(120, "Слишком длинное имя"),
  email: z.string().email("Укажите корректный email"),
  message: z
    .string()
    .min(10, "Опишите запрос подробнее (от 10 символов)")
    .max(4000, "Сообщение слишком длинное"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Нужно согласие на обработку персональных данных",
  }),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async () => {
    await new Promise((r) => setTimeout(r, 650));
    toast.success("Сообщение отправлено", {
      description:
        "Спасибо, мы получили ваше обращение и скоро свяжемся с вами.",
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:space-y-6 sm:p-8"
      noValidate
    >
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
              className="mt-0.5"
              aria-invalid={!!errors.consent}
            />
            <Label
              htmlFor="contact-consent"
              className="text-sm font-normal leading-snug text-muted-foreground"
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

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl sm:w-auto sm:min-w-[200px]"
      >
        {isSubmitting ? (
          <>
            <Loader2Icon className="size-4 animate-spin" data-icon="inline-start" />
            Отправка…
          </>
        ) : (
          "Отправить"
        )}
      </Button>
    </form>
  );
}
