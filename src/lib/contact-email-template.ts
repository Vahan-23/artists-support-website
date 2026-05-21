import { siteConfig } from "@/lib/site-config";

export type ContactEmailPayload = {
  name: string;
  email: string;
  message: string;
};

function getSiteBaseUrl(): string {
  const url = siteConfig.url.replace(/\/$/, "");
  return url.startsWith("http") ? url : `https://${url}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatSentAt(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Moscow",
  }).format(date);
}

/** HTML-письмо с логотипом и данными сайта */
export function buildContactEmailHtml(
  payload: ContactEmailPayload,
  sentAt = new Date(),
): string {
  const baseUrl = getSiteBaseUrl();
  const logoUrl = `${baseUrl}/logodark.png`;
  const siteUrl = baseUrl;
  const { name, email, message } = payload;
  const sentLabel = formatSentAt(sentAt);

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Сообщение с сайта</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f1ee;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f1ee;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e2dc;">
          <!-- Шапка -->
          <tr>
            <td style="background-color:#8B2E24;padding:28px 32px;text-align:center;">
              <a href="${siteUrl}" style="text-decoration:none;">
                <img src="${logoUrl}" alt="${escapeHtml(siteConfig.shortName)}" width="72" height="72" style="display:block;margin:0 auto 16px;border:0;object-fit:contain;" />
              </a>
              <p style="margin:0 0 6px;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">
                ${escapeHtml(siteConfig.shortName)}
              </p>
              <p style="margin:0;font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.85);">
                ${escapeHtml(siteConfig.tagline)}
              </p>
            </td>
          </tr>
          <!-- Заголовок письма -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#8B2E24;">
                ${escapeHtml(siteConfig.name)}
              </p>
              <h1 style="margin:0 0 8px;font-size:20px;font-weight:600;color:#1a1a1a;line-height:1.3;">
                Новое сообщение с сайта
              </h1>
              <p style="margin:0;font-size:13px;color:#6b6560;">
                ${sentLabel}
              </p>
            </td>
          </tr>
          <!-- Поля формы -->
          <tr>
            <td style="padding:8px 32px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf8f6;border-radius:8px;border:1px solid #ebe5df;">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #ebe5df;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8B2E24;">Имя</p>
                    <p style="margin:0;font-size:16px;color:#1a1a1a;">${escapeHtml(name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #ebe5df;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8B2E24;">Email отправителя</p>
                    <p style="margin:0;font-size:16px;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#8B2E24;text-decoration:underline;">${escapeHtml(email)}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8B2E24;">Сообщение</p>
                    <p style="margin:0;font-size:15px;line-height:1.55;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(message)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Данные организации -->
          <tr>
            <td style="padding:0 32px 28px;">
              <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#1a1a1a;">Контакты на сайте</p>
              <p style="margin:0 0 6px;font-size:14px;color:#4a4541;">
                <a href="${siteUrl}" style="color:#8B2E24;text-decoration:underline;">${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}</a>
              </p>
              <p style="margin:0 0 6px;font-size:14px;color:#4a4541;">
                Email: <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:#8B2E24;">${escapeHtml(siteConfig.email)}</a>
              </p>
              <p style="margin:0 0 6px;font-size:14px;color:#4a4541;">
                Телефон: <a href="tel:${siteConfig.phone.replace(/\s|\(|\)|-/g, "")}" style="color:#8B2E24;">${escapeHtml(siteConfig.phone)}</a>
              </p>
              <p style="margin:0;font-size:14px;color:#4a4541;">
                ${escapeHtml(siteConfig.address)}
              </p>
            </td>
          </tr>
          <!-- Подвал -->
          <tr>
            <td style="padding:16px 32px;background-color:#faf8f6;border-top:1px solid #ebe5df;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#8a837c;">
                Ответьте на это письмо — ответ уйдёт отправителю формы.<br />
                Письмо отправлено автоматически с формы обратной связи.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildContactEmailText(
  payload: ContactEmailPayload,
  sentAt = new Date(),
): string {
  const baseUrl = getSiteBaseUrl();
  const { name, email, message } = payload;

  return [
    siteConfig.name,
    siteConfig.shortName,
    siteConfig.tagline,
    "",
    "Новое сообщение с сайта",
    formatSentAt(sentAt),
    "",
    `Имя: ${name}`,
    `Email отправителя: ${email}`,
    "",
    "Сообщение:",
    message,
    "",
    "—".repeat(40),
    `Сайт: ${baseUrl}`,
    `Email: ${siteConfig.email}`,
    `Телефон: ${siteConfig.phone}`,
    `Адрес: ${siteConfig.address}`,
    "",
    "Ответьте на это письмо — ответ уйдёт отправителю формы.",
  ].join("\n");
}

export function buildContactEmailSubject(name: string): string {
  return `Сообщение с сайта «${siteConfig.shortName}»: ${name}`;
}
