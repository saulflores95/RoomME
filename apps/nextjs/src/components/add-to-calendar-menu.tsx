"use client";

import type { JSX } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

import type { CalendarEventInput } from "~/lib/calendar-export";
import {
  buildIcsCalendar,
  downloadIcsFile,
  googleCalendarUrl,
} from "~/lib/calendar-export";

interface AddToCalendarMenuProps {
  events: CalendarEventInput[];
  filename?: string;
  align?: "start" | "end";
  size?: "default" | "sm";
  variant?: "outline" | "ghost";
}

export function AddToCalendarMenu({
  events,
  filename = "roomme-tours.ics",
  align = "end",
  size = "sm",
  variant = "outline",
}: AddToCalendarMenuProps): JSX.Element {
  const t = useTranslations("tours");
  const nextEvent = events[0];
  const disabled = events.length === 0;

  const handleDownloadIcal = (): void => {
    if (events.length === 0) {
      return;
    }
    downloadIcsFile(buildIcsCalendar(events), filename);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" size={size} variant={variant} disabled={disabled}>
          <CalendarIcon />
          {t("addToCalendar")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-48">
        {nextEvent ? (
          <DropdownMenuItem asChild>
            <a
              href={googleCalendarUrl(nextEvent)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {events.length > 1
                ? t("addGoogleCalendarNext")
                : t("addGoogleCalendar")}
            </a>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            handleDownloadIcal();
          }}
        >
          {events.length > 1 ? t("addAllIcal") : t("addIcal")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
