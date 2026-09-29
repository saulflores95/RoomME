"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@acme/ui/field";
import { Input } from "@acme/ui/input";

import { ListingSectionCard } from "./section-card";

export function ContactPhoneFields({
  step,
  phone,
  error,
  onPhoneChange,
}: {
  step: number;
  phone: string;
  error: string | null;
  onPhoneChange: (value: string) => void;
}): JSX.Element {
  const t = useTranslations("list");

  return (
    <ListingSectionCard
      step={step}
      title={t("contactTitle")}
      description={t("contactHint")}
    >
      <Field data-invalid={error ? true : undefined}>
        <FieldLabel htmlFor="listing-contact-phone">
          {t("contactPhone")}
        </FieldLabel>
        <Input
          id="listing-contact-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+52 442 123 4567"
          aria-invalid={error ? true : undefined}
          value={phone}
          onChange={(event) => onPhoneChange(event.target.value)}
        />
        {error ? (
          <FieldError>{error}</FieldError>
        ) : (
          <FieldDescription>{t("contactPhoneHint")}</FieldDescription>
        )}
      </Field>
    </ListingSectionCard>
  );
}
