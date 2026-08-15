"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";

import type { CalendarLocaleCode } from "@acme/ui/calendar";
import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Calendar, calendarLocales } from "@acme/ui/calendar";
import { Input } from "@acme/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";

import { useMediaQuery } from "~/hooks/use-media-query";
import {
  dateKeyInTimeZone,
  parseCalendarDateKey,
  toCalendarDateKey,
} from "~/lib/tour-time";

export interface ResponsiveDatePickerProps {
  value: string;
  onChange: (dateKey: string) => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  /** Inclusive YYYY-MM-DD */
  min?: string;
  /** Inclusive YYYY-MM-DD */
  max?: string;
  /** Disable specific YYYY-MM-DD keys */
  disabledDates?: ReadonlySet<string> | readonly string[];
  /** When set, only these YYYY-MM-DD keys are selectable */
  enabledDates?: ReadonlySet<string> | readonly string[];
  placeholder?: string;
  /** Desktop: show calendar inline instead of popover */
  inline?: boolean;
  locale?: string;
  /** IANA zone used for YYYY-MM-DD keys and DayPicker math */
  timeZone?: string;
  /** Stretch an inline calendar to the container width */
  fullWidth?: boolean;
}

const toSet = (
  value: ReadonlySet<string> | readonly string[] | undefined,
): Set<string> | undefined => {
  if (!value) return undefined;
  return value instanceof Set ? value : new Set(value);
};

const toDateKey = (date: Date, timeZone?: string): string =>
  timeZone ? dateKeyInTimeZone(date, timeZone) : toCalendarDateKey(date);

const dayPickerLocale = (locale?: string) => {
  if (locale && locale in calendarLocales) {
    return calendarLocales[locale as CalendarLocaleCode];
  }
  return calendarLocales.en;
};

export function ResponsiveDatePicker({
  value,
  onChange,
  id,
  className,
  disabled = false,
  min,
  max,
  disabledDates,
  enabledDates,
  placeholder = "Pick a date",
  inline = false,
  locale,
  timeZone,
  fullWidth = false,
}: ResponsiveDatePickerProps): JSX.Element {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  const disabledSet = useMemo(() => toSet(disabledDates), [disabledDates]);
  const enabledSet = useMemo(() => toSet(enabledDates), [enabledDates]);

  const selected = value.length > 0 ? parseCalendarDateKey(value) : undefined;
  const fromDate = min ? parseCalendarDateKey(min) : undefined;
  const toDate = max ? parseCalendarDateKey(max) : undefined;

  const isDateDisabled = (date: Date): boolean => {
    const key = toDateKey(date, timeZone);
    if (min && key < min) return true;
    if (max && key > max) return true;
    if (disabledSet?.has(key)) return true;
    if (enabledSet && !enabledSet.has(key)) return true;
    return false;
  };

  const calendar = (
    <Calendar
      mode="single"
      required={value.length > 0}
      selected={selected}
      onSelect={(date: Date | undefined) => {
        if (!date) {
          return;
        }
        onChange(toDateKey(date, timeZone));
        setOpen(false);
      }}
      disabled={isDateDisabled}
      defaultMonth={selected ?? fromDate}
      startMonth={fromDate}
      endMonth={toDate}
      locale={dayPickerLocale(locale)}
      timeZone={timeZone}
      noonSafe={timeZone != null}
      fullWidth={fullWidth}
    />
  );

  if (inline) {
    return (
      <div className={cn(fullWidth ? "w-full" : "w-fit", className)}>
        {calendar}
      </div>
    );
  }

  if (!isDesktop) {
    return (
      <Input
        id={id}
        type="date"
        className={className}
        value={value}
        disabled={disabled}
        min={min}
        max={max}
        onChange={(event) => {
          const next = event.target.value;
          if (!next) {
            onChange("");
            return;
          }
          if (enabledSet && !enabledSet.has(next)) {
            return;
          }
          if (disabledSet?.has(next)) {
            return;
          }
          onChange(next);
        }}
      />
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="size-4" />
          {value.length > 0
            ? parseCalendarDateKey(value).toLocaleDateString(locale, {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {calendar}
      </PopoverContent>
    </Popover>
  );
}
