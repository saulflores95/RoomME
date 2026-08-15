"use client";

import type { JSX } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useLocale, useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";

import { ResponsiveDatePicker } from "~/components/responsive-date-picker";
import {
  calendarDateKeyFromDbDate,
  parseCalendarDateKey,
} from "~/lib/tour-time";
import { SettingsSectionCard } from "./section-card";

type BlockedDate = RouterOutputs["tour"]["myBlockedDates"][number];

export function SettingsBlockedDatesSection({
  blockedDates,
  blockDate,
  adding,
  onBlockDateChange,
  onAdd,
  onRemove,
}: {
  blockedDates: BlockedDate[];
  blockDate: string;
  adding: boolean;
  onBlockDateChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}): JSX.Element {
  const t = useTranslations("settings");
  const locale = useLocale();

  return (
    <SettingsSectionCard
      title={t("blockedSection")}
      description={t("blockedSectionHint")}
    >
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-44 flex-1 space-y-1.5">
          <label htmlFor="settings-block-date" className="sr-only">
            {t("addBlocked")}
          </label>
          <ResponsiveDatePicker
            id="settings-block-date"
            value={blockDate}
            onChange={onBlockDateChange}
            placeholder={t("addBlocked")}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={blockDate.length === 0 || adding}
          onClick={onAdd}
        >
          {t("addBlocked")}
        </Button>
      </div>

      {blockedDates.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("noBlockedDates")}</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {blockedDates.map((row) => {
            const key = calendarDateKeyFromDbDate(row.date);
            return (
              <li
                key={row.id}
                className="bg-muted text-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm"
              >
                <span>
                  {parseCalendarDateKey(key).toLocaleDateString(locale, {
                    dateStyle: "medium",
                  })}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-6 rounded-full"
                  aria-label={t("remove")}
                  onClick={() => onRemove(row.id)}
                >
                  <Cross2Icon className="size-3.5" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </SettingsSectionCard>
  );
}
