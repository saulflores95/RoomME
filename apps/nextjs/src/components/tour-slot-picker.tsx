"use client";

import type { JSX } from "react";
import { useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@acme/ui";

import { ResponsiveDatePicker } from "~/components/responsive-date-picker";
import {
  dateKeyInTourZone,
  formatTourTime,
  TOUR_TIMEZONE,
} from "~/lib/tour-time";

export interface TourSlotPickerProps {
  slots: { startsAt: Date | string }[];
  loading?: boolean;
  selectedDate: string;
  selectedSlot: Date | null;
  onSelectDate: (dateKey: string) => void;
  onSelectSlot: (slot: Date | null) => void;
  minDate?: string;
  maxDate?: string;
  className?: string;
}

export function TourSlotPicker({
  slots,
  loading = false,
  selectedDate,
  selectedSlot,
  onSelectDate,
  onSelectSlot,
  minDate,
  maxDate,
  className,
}: TourSlotPickerProps): JSX.Element {
  const t = useTranslations("tours");
  const locale = useLocale();

  const slotsByDate = useMemo(() => {
    const map = new Map<string, Date[]>();
    for (const row of slots) {
      const startsAt = new Date(row.startsAt);
      const key = dateKeyInTourZone(startsAt);
      const list = map.get(key) ?? [];
      list.push(startsAt);
      map.set(key, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.getTime() - b.getTime());
    }
    return map;
  }, [slots]);

  const enabledDates = useMemo(
    () => new Set(slotsByDate.keys()),
    [slotsByDate],
  );

  const sortedEnabledDates = useMemo(
    () => [...enabledDates].sort(),
    [enabledDates],
  );

  useEffect(() => {
    if (loading || selectedDate.length > 0 || sortedEnabledDates.length === 0) {
      return;
    }
    const first = sortedEnabledDates[0];
    if (first) {
      onSelectDate(first);
    }
  }, [loading, onSelectDate, selectedDate, sortedEnabledDates]);

  const daySlots =
    selectedDate.length > 0 ? (slotsByDate.get(selectedDate) ?? []) : [];

  const rangeMin =
    minDate ?? sortedEnabledDates[0] ?? dateKeyInTourZone(new Date());
  const rangeMax = maxDate ?? sortedEnabledDates.at(-1);

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <h3 className="mb-2 text-sm font-semibold">{t("pickDate")}</h3>
        {loading ? (
          <p className="text-muted-foreground text-sm">{t("loadingSlots")}</p>
        ) : enabledDates.size === 0 ? (
          <p className="text-muted-foreground text-sm">{t("noSlots")}</p>
        ) : (
          <ResponsiveDatePicker
            value={selectedDate}
            onChange={(next) => {
              onSelectDate(next);
              onSelectSlot(null);
            }}
            enabledDates={enabledDates}
            min={rangeMin}
            max={rangeMax}
            inline
            fullWidth
            locale={locale}
            timeZone={TOUR_TIMEZONE}
            placeholder={t("pickDate")}
          />
        )}
      </div>

      {selectedDate.length > 0 && !loading ? (
        <div>
          <h3 className="mb-2 text-sm font-semibold">{t("pickTime")}</h3>
          {daySlots.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t("noSlotsForDay")}
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {daySlots.map((slot) => {
                const selected = selectedSlot?.getTime() === slot.getTime();
                return (
                  <button
                    key={slot.toISOString()}
                    type="button"
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50 hover:bg-muted/40",
                    )}
                    onClick={() => onSelectSlot(slot)}
                  >
                    {formatTourTime(slot, locale)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
