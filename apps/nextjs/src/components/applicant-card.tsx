"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";

import { Link } from "~/i18n/navigation";

type Application = RouterOutputs["application"]["listForRoom"][number];

export function ApplicantCard({
  application,
}: {
  application: Application;
}): JSX.Element {
  const t = useTranslations("profile");
  const { applicant } = application;
  const bioPreview =
    applicant.bio && applicant.bio.length > 120
      ? `${applicant.bio.slice(0, 120).trimEnd()}…`
      : applicant.bio;

  return (
    <Link
      href={`/profiles/${applicant.id}`}
      className="border-border hover:bg-muted/40 flex gap-3 rounded-2xl border p-3 transition-colors"
    >
      {applicant.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={applicant.image}
          alt={applicant.name}
          className="size-14 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="bg-muted text-muted-foreground flex size-14 shrink-0 items-center justify-center rounded-full text-xl font-medium">
          {applicant.name.slice(0, 1).toUpperCase()}
        </span>
      )}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <p className="font-semibold">
            {applicant.name}
            {applicant.age != null ? (
              <span className="text-muted-foreground font-medium">
                {`, ${applicant.age}`}
              </span>
            ) : null}
          </p>
          {applicant.ratingCount > 0 && applicant.ratingAverage != null ? (
            <p className="text-muted-foreground text-xs tabular-nums">
              ★ {applicant.ratingAverage.toFixed(1)} ·{" "}
              {t("ratingCount", { count: applicant.ratingCount })}
            </p>
          ) : null}
        </div>
        {bioPreview ? (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {bioPreview}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">{t("noBio")}</p>
        )}
        {application.message ? (
          <p className="text-foreground/80 line-clamp-2 text-sm italic">
            “{application.message}”
          </p>
        ) : null}
      </div>
    </Link>
  );
}
