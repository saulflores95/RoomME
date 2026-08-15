import { Resend } from "resend";

import { authEnv } from "../env";

const env = authEnv();

const getResend = (): Resend | null => {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey || apiKey.length === 0) {
    return null;
  }
  return new Resend(apiKey);
};

const getFrom = (): string => env.EMAIL_FROM ?? "RooMe <onboarding@resend.dev>";

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export const sendEmail = async (input: SendEmailInput): Promise<void> => {
  const resend = getResend();
  if (!resend) {
    console.log("[email] RESEND_API_KEY missing; skipping send", {
      to: input.to,
      subject: input.subject,
    });
    return;
  }

  const { error } = await resend.emails.send({
    from: getFrom(),
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });

  if (error) {
    console.error("[email] Resend error", error);
    throw new Error(error.message);
  }
};

export const sendPasswordResetEmail = async (args: {
  to: string;
  name: string;
  url: string;
}): Promise<void> => {
  const subject = "Reset your RooMe password";
  const text = `Hi ${args.name},\n\nReset your password: ${args.url}\n\nIf you did not request this, ignore this email.`;
  const html = `<p>Hi ${args.name},</p><p><a href="${args.url}">Reset your password</a></p><p>If you did not request this, ignore this email.</p>`;
  await sendEmail({ to: args.to, subject, html, text });
};

export const sendVerificationEmail = async (args: {
  to: string;
  name: string;
  url: string;
}): Promise<void> => {
  const subject = "Verify your RooMe email";
  const text = `Hi ${args.name},\n\nVerify your email: ${args.url}`;
  const html = `<p>Hi ${args.name},</p><p><a href="${args.url}">Verify your email</a></p>`;
  await sendEmail({ to: args.to, subject, html, text });
};

export const sendTourBookingEmails = async (args: {
  agentEmail: string;
  agentName: string;
  seekerEmail: string;
  seekerName: string;
  roomTitle: string;
  startsAt: Date;
  kind: "booked" | "cancelled" | "rescheduled";
}): Promise<void> => {
  const when = args.startsAt.toLocaleString("es-MX", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  });

  const titles: Record<typeof args.kind, string> = {
    booked: "Tour booked",
    cancelled: "Tour cancelled",
    rescheduled: "Tour rescheduled",
  };
  const subject = `${titles[args.kind]}: ${args.roomTitle}`;

  const agentText = `Hi ${args.agentName},\n\nTour with ${args.seekerName} for "${args.roomTitle}" — ${when}.\nStatus: ${args.kind}.`;
  const seekerText = `Hi ${args.seekerName},\n\nYour tour of "${args.roomTitle}" with agent ${args.agentName} — ${when}.\nStatus: ${args.kind}.`;

  await Promise.all([
    sendEmail({
      to: args.agentEmail,
      subject,
      text: agentText,
      html: `<p>${agentText.replaceAll("\n", "<br/>")}</p>`,
    }),
    sendEmail({
      to: args.seekerEmail,
      subject,
      text: seekerText,
      html: `<p>${seekerText.replaceAll("\n", "<br/>")}</p>`,
    }),
  ]);
};
