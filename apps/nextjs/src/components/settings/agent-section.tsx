"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Checkbox } from "@acme/ui/checkbox";
import { Field, FieldLabel } from "@acme/ui/field";
import { TimePicker } from "@acme/ui/time-picker";

import { checkboxRowClassName } from "~/components/listing/form-controls";
import { SettingsSectionCard } from "./section-card";

export const SETTINGS_DAYS = [0, 1, 2, 3, 4, 5, 6] as const;

export interface DayHours {
  start: string;
  end: string;
  enabled: boolean;
}

export function SettingsAgentSection({
  cities,
  dayHours,
  dayLabels,
  saving,
  onCitiesChange,
  onDayHoursChange,
  onSave,
}: {
  cities: string[];
  dayHours: Record<number, DayHours>;
  dayLabels: readonly string[];
  saving: boolean;
  onCitiesChange: (cities: string[]) => void;
  onDayHoursChange: (dayHours: Record<number, DayHours>) => void;
  onSave: () => void;
}): JSX.Element {
  const t = useTranslations("settings");

  return (
    <SettingsSectionCard
      title={t("agentSection")}
      description={t("agentSectionHint")}
      footer={
        <Button type="button" disabled={saving} onClick={onSave}>
          {t("saveAvailability")}
        </Button>
      }
    >
      <div className="space-y-2">
        <p className="text-sm font-medium">{t("citiesLabel")}</p>
        <Field orientation="horizontal" className={checkboxRowClassName}>
          <Checkbox
            id="settings-city-queretaro"
            checked={cities.includes("queretaro")}
            onCheckedChange={(checked) => {
              onCitiesChange(
                checked === true
                  ? [...cities, "queretaro"]
                  : cities.filter((city) => city !== "queretaro"),
              );
            }}
          />
          <FieldLabel htmlFor="settings-city-queretaro" className="font-normal">
            {t("cityQueretaro")}
          </FieldLabel>
        </Field>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">{t("hoursLabel")}</p>
        {!SETTINGS_DAYS.some((day) => dayHours[day]?.enabled) ? (
          <p className="text-muted-foreground text-sm">{t("hoursEmptyHint")}</p>
        ) : null}
        <div className="space-y-2">
          {SETTINGS_DAYS.map((day) => {
            const row = dayHours[day];
            if (!row) {
              return null;
            }

            return (
              <div
                key={day}
                className={cn(
                  "flex flex-wrap items-center gap-3 rounded-xl border px-3 py-2.5",
                  row.enabled
                    ? "border-input bg-card"
                    : "border-border bg-muted/30",
                )}
              >
                <Checkbox
                  id={`settings-day-${String(day)}`}
                  checked={row.enabled}
                  onCheckedChange={(checked) =>
                    onDayHoursChange({
                      ...dayHours,
                      [day]: { ...row, enabled: checked === true },
                    })
                  }
                />
                <FieldLabel
                  htmlFor={`settings-day-${String(day)}`}
                  className="w-16 font-medium"
                >
                  {dayLabels[day]}
                </FieldLabel>
                <TimePicker
                  disabled={!row.enabled}
                  value={row.start}
                  onChange={(start) =>
                    onDayHoursChange({
                      ...dayHours,
                      [day]: { ...row, start },
                    })
                  }
                />
                <span className="text-muted-foreground">–</span>
                <TimePicker
                  disabled={!row.enabled}
                  value={row.end}
                  onChange={(end) =>
                    onDayHoursChange({
                      ...dayHours,
                      [day]: { ...row, end },
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </SettingsSectionCard>
  );
}
