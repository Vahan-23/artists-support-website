import { Resend } from "resend";

import { contactApiSchema } from "@/lib/contact-schema";
import {
  buildContactEmailHtml,
  buildContactEmailSubject,
  buildContactEmailText,
} from "@/lib/contact-email-template";
import { siteConfig } from "@/lib/site-config";

const DEFAULT_TO = siteConfig.email;

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = contactApiSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "Проверьте поля формы", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return Response.json(
      {
        error:
          "Отправка временно недоступна. Напишите нам на почту или позвоните.",
      },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO;
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const fromName = process.env.CONTACT_FROM_NAME ?? siteConfig.shortName;
  const from = `${fromName} <${fromAddress}>`;

  const resend = new Resend(apiKey);
  const payload = { name, email, message };
  const sentAt = new Date();

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: buildContactEmailSubject(name),
    text: buildContactEmailText(payload, sentAt),
    html: buildContactEmailHtml(payload, sentAt),
  });

  if (error || !data?.id) {
    console.error("[contact] Resend error:", error);
    const resendMessage =
      error && typeof error === "object" && "message" in error
        ? String(error.message)
        : null;

    return Response.json(
      {
        error:
          resendMessage ??
          "Не удалось отправить сообщение. Попробуйте позже или напишите на почту.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, id: data.id });
}
