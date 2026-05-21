import { z } from "zod";

/** Поля формы на сайте (без honeypot) */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Введите имя (не менее 2 символов)")
    .max(120, "Слишком длинное имя"),
  email: z.string().trim().email("Укажите корректный email"),
  message: z
    .string()
    .trim()
    .min(10, "Опишите запрос подробнее (от 10 символов)")
    .max(4000, "Сообщение слишком длинное"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Нужно согласие на обработку персональных данных",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Тело запроса к API (только поля формы) */
export const contactApiSchema = contactFormSchema;
