"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";

import { Link } from "~/i18n/navigation";

export interface TourAgentCardProps {
  id: string;
  name: string;
  image: string | null;
  bio?: string | null;
  age?: number | null;
  onChange: () => void;
  className?: string;
}

export function AgentAvatar({
  name,
  image,
  className,
}: {
  name: string;
  image: string | null;
  className?: string;
}): JSX.Element {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt=""
        className={cn("size-12 rounded-full object-cover", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "bg-muted text-foreground flex size-12 items-center justify-center rounded-full text-lg font-semibold",
        className,
      )}
    >
      {name.slice(0, 1)}
    </span>
  );
}

export function TourAgentCard({
  id,
  name,
  image,
  bio,
  age,
  onChange,
  className,
}: TourAgentCardProps): JSX.Element {
  const t = useTranslations("tours");

  return (
    <div
      className={cn(
        "border-border bg-muted/30 flex items-center gap-3 rounded-xl border p-3",
        className,
      )}
    >
      <AgentAvatar name={name} image={image} className="size-14" />
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {t("agentLabel")}
        </p>
        <p className="truncate font-semibold">
          {name}
          {age != null ? `, ${age}` : ""}
        </p>
        {bio ? (
          <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
            {bio}
          </p>
        ) : null}
        <Link
          href={`/profiles/${id}`}
          className="text-brand mt-1 inline-block text-sm font-medium hover:underline"
        >
          {t("viewProfile")}
        </Link>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={onChange}>
        {t("changeAgent")}
      </Button>
    </div>
  );
}
