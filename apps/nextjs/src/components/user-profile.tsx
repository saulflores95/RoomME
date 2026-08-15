"use client";

import type { JSX } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { cn } from "@acme/ui";
import {
  isPresetHobby,
  isPresetPersonality,
  PET_SIZES,
  PET_TYPES,
} from "@acme/validators";

import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

const StarRow = ({
  score,
  size = "md",
}: {
  score: number;
  size?: "sm" | "md";
}): JSX.Element => {
  const rounded = Math.round(score);
  return (
    <span
      className={cn(
        "text-brand inline-flex tracking-tight",
        size === "sm" ? "text-sm" : "text-base",
      )}
      aria-hidden
    >
      {"★★★★★".slice(0, Math.min(5, Math.max(0, rounded)))}
      <span className="text-muted-foreground">
        {"★★★★★".slice(Math.min(5, Math.max(0, rounded)))}
      </span>
    </span>
  );
};

export function UserProfile({ userId }: { userId: string }): JSX.Element {
  const t = useTranslations("profile");
  const tags = useTranslations("tags");
  const trpc = useTRPC();
  const { data: profile } = useSuspenseQuery(
    trpc.profile.byId.queryOptions({ userId }),
  );

  const petType = PET_TYPES.find((item) => item === profile.petType);
  const petSize = PET_SIZES.find((item) => item === profile.petSize);
  const petLabel = profile.hasPets
    ? [
        petType ? tags(`petType.${petType}`) : t("petsYes"),
        petType === "dog" && petSize ? tags(`petSize.${petSize}`) : null,
      ]
        .filter((item): item is string => item != null)
        .join(" · ")
    : t("petsNo");

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
        {profile.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.image}
            alt={profile.name}
            className="size-28 shrink-0 rounded-full object-cover sm:size-32"
          />
        ) : (
          <span className="bg-muted text-muted-foreground flex size-28 shrink-0 items-center justify-center rounded-full text-4xl font-semibold sm:size-32">
            {profile.name.slice(0, 1).toUpperCase()}
          </span>
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {profile.isAgent
              ? t("roleAgent")
              : profile.isHost
                ? t("roleHost")
                : t("roleRoomie")}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {profile.name}
            {profile.age != null ? (
              <span className="text-muted-foreground font-semibold">
                {`, ${profile.age}`}
              </span>
            ) : null}
          </h1>

          {profile.ratingCount > 0 && profile.ratingAverage != null ? (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <StarRow score={profile.ratingAverage} />
              <p className="text-sm font-medium tabular-nums">
                {t("ratingSummary", {
                  average: profile.ratingAverage.toFixed(1),
                  count: profile.ratingCount,
                })}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">{t("noRatings")}</p>
          )}
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">{t("about")}</h2>
        {profile.bio && profile.bio.trim().length > 0 ? (
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {profile.bio}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">{t("noBio")}</p>
        )}
        {profile.hobbies.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">{t("hobbies")}</p>
            <div className="flex flex-wrap gap-2">
              {profile.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="border-input bg-muted/40 inline-flex h-8 items-center rounded-full border px-3 text-sm"
                >
                  {isPresetHobby(hobby) ? tags(`hobby.${hobby}`) : hobby}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        {profile.personalities.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">{t("personalities")}</p>
            <div className="flex flex-wrap gap-2">
              {profile.personalities.map((trait) => (
                <span
                  key={trait}
                  className="border-input bg-muted/40 inline-flex h-8 items-center rounded-full border px-3 text-sm"
                >
                  {isPresetPersonality(trait)
                    ? tags(`personality.${trait}`)
                    : trait}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        <p className="text-sm">
          <span className="font-medium">{t("pets")}: </span>
          {petLabel}
        </p>
        {profile.isAgent && profile.operatingCities.length > 0 ? (
          <p className="text-sm">
            <span className="font-medium">{t("operatingCities")}: </span>
            {profile.operatingCities.join(", ")}
          </p>
        ) : null}
      </section>

      {profile.ratings.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">{t("reviews")}</h2>
          <ul className="space-y-3">
            {profile.ratings.map((rating) => (
              <li
                key={rating.id}
                className="border-border space-y-2 rounded-2xl border p-4"
              >
                <div className="flex items-center gap-3">
                  {rating.rater.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={rating.rater.image}
                      alt={rating.rater.name}
                      className="size-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-full text-sm font-medium">
                      {rating.rater.name.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/profiles/${rating.rater.id}`}
                      className="font-medium underline-offset-4 hover:underline"
                    >
                      {rating.rater.name}
                    </Link>
                    <div className="mt-0.5">
                      <StarRow score={rating.score} size="sm" />
                    </div>
                  </div>
                </div>
                {rating.comment ? (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {rating.comment}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
