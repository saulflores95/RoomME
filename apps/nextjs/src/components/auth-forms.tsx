"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import { Field, FieldGroup, FieldLabel } from "@acme/ui/field";
import { Input } from "@acme/ui/input";

import { authClient } from "~/auth/client";
import { Link, useRouter } from "~/i18n/navigation";

function PasswordField({
  id,
  name,
  label,
  autoComplete,
  minLength,
}: {
  id: string;
  name: string;
  label: string;
  autoComplete?: string;
  minLength?: number;
}) {
  const t = useTranslations("auth");
  const [visible, setVisible] = useState(false);

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required
          minLength={minLength}
          autoComplete={autoComplete}
          className="pr-10"
        />
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex w-10 items-center justify-center"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? t("hidePassword") : t("showPassword")}
        >
          {visible ? (
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path
                fill="currentColor"
                d="M13.36 11.64 12.3 10.58A6.3 6.3 0 0 0 14 8c-1.4-2.8-4.1-4.5-7-4.5-1 0-2 .2-2.9.6L2.64 2.64 1.7 3.58l10.72 10.72.94-.94ZM8 5.5A2.5 2.5 0 0 1 10.5 8c0 .3 0 .5-.1.8L7.2 5.6c.3-.1.5-.1.8-.1Zm0 7c2.9 0 5.6-1.7 7-4.5-.5-1-1.2-1.9-2.1-2.6l-1.1 1.1A5 5 0 0 1 8 10.5a5 5 0 0 1-1.7-.3l-1.2 1.2c.9.4 1.9.6 2.9.6Z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path
                fill="currentColor"
                d="M8 3.5c-2.9 0-5.6 1.7-7 4.5 1.4 2.8 4.1 4.5 7 4.5s5.6-1.7 7-4.5c-1.4-2.8-4.1-4.5-7-4.5ZM8 10.5A2.5 2.5 0 1 1 8 5.5a2.5 2.5 0 0 1 0 5Z"
              />
            </svg>
          )}
        </button>
      </div>
    </Field>
  );
}

export function SignInForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="mx-auto max-w-sm space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const result = await authClient.signIn.email({
          email: String(data.get("email") ?? ""),
          password: String(data.get("password") ?? ""),
        });
        if (result.error) {
          setError(result.error.message ?? "Error");
          return;
        }
        router.push("/");
        router.refresh();
      }}
    >
      <h1 className="text-2xl font-semibold">{t("signInTitle")}</h1>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </Field>
        <PasswordField
          id="password"
          name="password"
          label={t("password")}
          autoComplete="current-password"
        />
      </FieldGroup>
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
      <Button type="submit" className="w-full">
        {t("submitSignIn")}
      </Button>
      <p className="text-muted-foreground text-sm">
        <Link href="/forgot-password">{t("forgotLink")}</Link>
      </p>
      <p className="text-sm">
        {t("noAccount")}{" "}
        <Link href="/sign-up" className="underline">
          {t("submitSignUp")}
        </Link>
      </p>
    </form>
  );
}

export function SignUpForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="mx-auto max-w-sm space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = String(data.get("password") ?? "");
        const confirmPassword = String(data.get("confirmPassword") ?? "");
        if (password !== confirmPassword) {
          setError(t("passwordMismatch"));
          return;
        }
        const result = await authClient.signUp.email({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          password,
        });
        if (result.error) {
          setError(result.error.message ?? "Error");
          return;
        }
        router.push("/");
        router.refresh();
      }}
    >
      <h1 className="text-2xl font-semibold">{t("signUpTitle")}</h1>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">{t("name")}</FieldLabel>
          <Input id="name" name="name" required autoComplete="name" />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </Field>
        <PasswordField
          id="password"
          name="password"
          label={t("password")}
          autoComplete="new-password"
          minLength={8}
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label={t("confirmPassword")}
          autoComplete="new-password"
          minLength={8}
        />
      </FieldGroup>
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
      <Button type="submit" className="w-full">
        {t("submitSignUp")}
      </Button>
      <p className="text-sm">
        {t("hasAccount")}{" "}
        <Link href="/sign-in" className="underline">
          {t("submitSignIn")}
        </Link>
      </p>
    </form>
  );
}

export function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="mx-auto max-w-sm text-sm">{t("checkEmail")}</p>;
  }

  return (
    <form
      className="mx-auto max-w-sm space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await authClient.requestPasswordReset({
          email: String(data.get("email") ?? ""),
          redirectTo: "/reset-password",
        });
        setSent(true);
      }}
    >
      <h1 className="text-2xl font-semibold">{t("forgotTitle")}</h1>
      <Field>
        <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </Field>
      <Button type="submit" className="w-full">
        {t("submitForgot")}
      </Button>
    </form>
  );
}

export function ResetPasswordForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="mx-auto max-w-sm space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = String(data.get("password") ?? "");
        const confirmPassword = String(data.get("confirmPassword") ?? "");
        if (password !== confirmPassword) {
          setError(t("passwordMismatch"));
          return;
        }
        const token = new URLSearchParams(window.location.search).get("token");
        if (!token) {
          setError("Missing token");
          return;
        }
        const result = await authClient.resetPassword({
          newPassword: password,
          token,
        });
        if (result.error) {
          setError(result.error.message ?? "Error");
          return;
        }
        router.push("/sign-in");
      }}
    >
      <h1 className="text-2xl font-semibold">{t("resetTitle")}</h1>
      <FieldGroup>
        <PasswordField
          id="password"
          name="password"
          label={t("password")}
          autoComplete="new-password"
          minLength={8}
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label={t("confirmPassword")}
          autoComplete="new-password"
          minLength={8}
        />
      </FieldGroup>
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
      <Button type="submit" className="w-full">
        {t("submitReset")}
      </Button>
    </form>
  );
}
