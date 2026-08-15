import { EMAIL_BRAND, logoSvg } from "./brand";

export interface EmailCta {
  label: string;
  url: string;
}

export interface EmailDetailRow {
  label: string;
  value: string;
}

export interface RenderEmailInput {
  preheader?: string;
  heading: string;
  bodyHtml: string;
  cta?: EmailCta;
  footerNote?: string;
}

export const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const emailParagraph = (html: string): string =>
  `<p style="margin:0 0 16px;font-size:16px;line-height:26px;color:${EMAIL_BRAND.text};">${html}</p>`;

export const emailDetailsBlock = (rows: readonly EmailDetailRow[]): string => {
  const cells = rows
    .map((row, index) => {
      const top = index === 0 ? "0" : "14px";
      return `<tr>
          <td valign="top" style="padding:${top} 16px 0 0;width:92px;font-size:13px;line-height:20px;color:${EMAIL_BRAND.muted};white-space:nowrap;">${escapeHtml(row.label)}</td>
          <td valign="top" style="padding:${top} 0 0;font-size:15px;line-height:22px;font-weight:600;color:${EMAIL_BRAND.text};">${escapeHtml(row.value)}</td>
        </tr>`;
    })
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 28px;background-color:${EMAIL_BRAND.surface};border:1px solid ${EMAIL_BRAND.border};border-radius:${EMAIL_BRAND.radius};">
    <tr>
      <td style="padding:20px 22px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cells}</table>
      </td>
    </tr>
  </table>`;
};

const renderCta = (cta: EmailCta): string => {
  const href = escapeHtml(cta.url);
  const label = escapeHtml(cta.label);

  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 12px;">
    <tr>
      <td align="center" bgcolor="${EMAIL_BRAND.green}" style="background-color:${EMAIL_BRAND.green};border-radius:999px;mso-padding-alt:12px 28px;">
        <a class="email-cta" href="${href}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:12px 28px;font-family:${EMAIL_BRAND.font};font-size:15px;line-height:22px;font-weight:600;color:${EMAIL_BRAND.buttonText} !important;text-decoration:none;border-radius:999px;">
          <span style="color:${EMAIL_BRAND.buttonText} !important;text-decoration:none;">${label}</span>
        </a>
      </td>
    </tr>
  </table>
  <p style="margin:0 0 8px;font-size:13px;line-height:20px;color:${EMAIL_BRAND.muted};">
    Or open <a href="${href}" target="_blank" rel="noopener noreferrer" style="color:${EMAIL_BRAND.green};text-decoration:underline;word-break:break-all;">${href}</a>
  </p>`;
};

export const renderEmail = (input: RenderEmailInput): string => {
  const preheader = input.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${EMAIL_BRAND.background};opacity:0;">${escapeHtml(input.preheader)}</div>`
    : "";
  const ctaHtml = input.cta ? renderCta(input.cta) : "";
  const footerNote = input.footerNote
    ? `<p style="margin:10px 0 0;font-size:13px;line-height:20px;color:${EMAIL_BRAND.muted};">${escapeHtml(input.footerNote)}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>${escapeHtml(input.heading)}</title>
  <style type="text/css">
    :root { color-scheme: light only; }
    a.email-cta, a.email-cta span { color: ${EMAIL_BRAND.buttonText} !important; text-decoration: none !important; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${EMAIL_BRAND.background};">
  ${preheader}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${EMAIL_BRAND.background};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:${EMAIL_BRAND.card};border:1px solid ${EMAIL_BRAND.border};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="height:6px;background-color:${EMAIL_BRAND.green};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 0;font-family:${EMAIL_BRAND.font};">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle" style="padding-right:10px;">${logoSvg(28)}</td>
                  <td valign="middle" style="font-size:18px;line-height:24px;font-weight:700;letter-spacing:-0.02em;color:${EMAIL_BRAND.green};">${EMAIL_BRAND.productName}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 36px;font-family:${EMAIL_BRAND.font};color:${EMAIL_BRAND.text};">
              <h1 style="margin:0 0 12px;font-size:26px;line-height:34px;font-weight:700;letter-spacing:-0.03em;color:${EMAIL_BRAND.text};">${escapeHtml(input.heading)}</h1>
              ${input.bodyHtml}
              ${ctaHtml}
            </td>
          </tr>
        </table>
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <tr>
            <td style="padding:24px 8px 0;font-family:${EMAIL_BRAND.font};font-size:13px;line-height:20px;color:${EMAIL_BRAND.muted};text-align:center;">
              <a href="${EMAIL_BRAND.siteUrl}" target="_blank" rel="noopener noreferrer" style="color:${EMAIL_BRAND.green};text-decoration:none;font-weight:700;">${EMAIL_BRAND.productName}</a>
              <span style="color:${EMAIL_BRAND.border};padding:0 8px;">·</span>
              <a href="${EMAIL_BRAND.siteUrl}" target="_blank" rel="noopener noreferrer" style="color:${EMAIL_BRAND.muted};text-decoration:none;">roome.mx</a>
              ${footerNote}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
