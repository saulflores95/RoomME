import { Resend } from "resend";

import { authEnv } from "../env";
import { emailAppUrl } from "./emails/brand";
import {
  emailDetailsBlock,
  emailParagraph,
  escapeHtml,
  renderEmail,
} from "./emails/layout";

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
  const html = renderEmail({
    preheader: "Reset your RooMe password",
    heading: "Reset your password",
    bodyHtml: `${emailParagraph(`Hi ${escapeHtml(args.name)},`)}${emailParagraph("Use the button below to reset your RooMe password.")}`,
    cta: { label: "Reset password", url: args.url },
    footerNote: "If you did not request this, ignore this email.",
  });
  await sendEmail({ to: args.to, subject, html, text });
};

export const sendVerificationEmail = async (args: {
  to: string;
  name: string;
  url: string;
}): Promise<void> => {
  const subject = "Verify your RooMe email";
  const text = `Hi ${args.name},\n\nVerify your email: ${args.url}`;
  const html = renderEmail({
    preheader: "Verify your RooMe email",
    heading: "Verify your email",
    bodyHtml: `${emailParagraph(`Hi ${escapeHtml(args.name)},`)}${emailParagraph("Use the button below to verify your RooMe email.")}`,
    cta: { label: "Verify email", url: args.url },
  });
  await sendEmail({ to: args.to, subject, html, text });
};

const tourStatusLabels: Record<"booked" | "cancelled" | "rescheduled", string> =
  {
    booked: "Booked",
    cancelled: "Cancelled",
    rescheduled: "Rescheduled",
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
  const when = args.startsAt.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Mexico_City",
    timeZoneName: "short",
  });

  const titles: Record<typeof args.kind, string> = {
    booked: "Tour booked",
    cancelled: "Tour cancelled",
    rescheduled: "Tour rescheduled",
  };
  const subject = `${titles[args.kind]}: ${args.roomTitle}`;
  const status = tourStatusLabels[args.kind];
  const agentToursUrl = emailAppUrl("/en/agent/calendar");
  const seekerToursUrl = emailAppUrl("/en/tours");

  const agentDetails = emailDetailsBlock([
    { label: "Room", value: args.roomTitle },
    { label: "When", value: when },
    { label: "Guest", value: args.seekerName },
    { label: "Status", value: status },
  ]);
  const seekerDetails = emailDetailsBlock([
    { label: "Room", value: args.roomTitle },
    { label: "When", value: when },
    { label: "Agent", value: args.agentName },
    { label: "Status", value: status },
  ]);

  const agentIntro =
    args.kind === "booked"
      ? `${escapeHtml(args.seekerName)} booked a tour with you.`
      : args.kind === "cancelled"
        ? `The tour with ${escapeHtml(args.seekerName)} was cancelled.`
        : `The tour with ${escapeHtml(args.seekerName)} was rescheduled.`;
  const seekerIntro =
    args.kind === "booked"
      ? `Your tour with ${escapeHtml(args.agentName)} is confirmed.`
      : args.kind === "cancelled"
        ? `Your tour with ${escapeHtml(args.agentName)} was cancelled.`
        : `Your tour with ${escapeHtml(args.agentName)} was rescheduled.`;

  const agentText = `Hi ${args.agentName},\n\n${args.seekerName} — "${args.roomTitle}" — ${when}.\nStatus: ${status}.\n\n${agentToursUrl}`;
  const seekerText = `Hi ${args.seekerName},\n\n"${args.roomTitle}" with ${args.agentName} — ${when}.\nStatus: ${status}.\n\n${seekerToursUrl}`;

  await Promise.all([
    sendEmail({
      to: args.agentEmail,
      subject,
      text: agentText,
      html: renderEmail({
        preheader: subject,
        heading: titles[args.kind],
        bodyHtml: `${emailParagraph(`Hi ${escapeHtml(args.agentName)},`)}${emailParagraph(agentIntro)}${agentDetails}`,
        cta: { label: "View calendar", url: agentToursUrl },
      }),
    }),
    sendEmail({
      to: args.seekerEmail,
      subject,
      text: seekerText,
      html: renderEmail({
        preheader: subject,
        heading: titles[args.kind],
        bodyHtml: `${emailParagraph(`Hi ${escapeHtml(args.seekerName)},`)}${emailParagraph(seekerIntro)}${seekerDetails}`,
        cta: { label: "View my tours", url: seekerToursUrl },
      }),
    }),
  ]);
};
