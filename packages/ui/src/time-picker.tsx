"use client";

import type { JSX } from "react";
import { ClockIcon } from "@radix-ui/react-icons";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";

const HOURS_12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
const MINUTE_STEP = 15;

const parseTime = (value: string): { hour24: number; minute: number } => {
  const [hours, minutes] = value.split(":").map(Number);
  return { hour24: hours ?? 0, minute: minutes ?? 0 };
};

const toValue = (hour24: number, minute: number): string =>
  `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

const toHour12 = (hour24: number): number => {
  const hour = hour24 % 12;
  return hour === 0 ? 12 : hour;
};

const toHour24 = (hour12: number, isPm: boolean): number => {
  if (hour12 === 12) {
    return isPm ? 12 : 0;
  }
  return isPm ? hour12 + 12 : hour12;
};

const formatDisplay = (value: string): string => {
  const { hour24, minute } = parseTime(value);
  const period = hour24 >= 12 ? "PM" : "AM";
  return `${String(toHour12(hour24))}:${String(minute).padStart(2, "0")} ${period}`;
};

const minuteOptions = (current: number): number[] => {
  const options = Array.from(
    { length: 60 / MINUTE_STEP },
    (_, index) => index * MINUTE_STEP,
  );
  if (!options.includes(current)) {
    return [...options, current].sort((a, b) => a - b);
  }
  return options;
};

const columnButtonClass = (selected: boolean): string =>
  cn(
    "h-8 w-12 rounded-md text-sm tabular-nums",
    selected
      ? "bg-primary text-primary-foreground"
      : "hover:bg-muted text-foreground",
  );

export function TimePicker({
  value,
  onChange,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}): JSX.Element {
  const { hour24, minute } = parseTime(value);
  const isPm = hour24 >= 12;
  const hour12 = toHour12(hour24);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className="w-32 justify-start font-normal tabular-nums"
        >
          <ClockIcon className="size-4" />
          {formatDisplay(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2">
        <div className="flex gap-1">
          <div className="flex max-h-48 flex-col overflow-y-auto">
            {HOURS_12.map((hour) => (
              <button
                key={hour}
                type="button"
                className={columnButtonClass(hour === hour12)}
                onClick={() => onChange(toValue(toHour24(hour, isPm), minute))}
              >
                {hour}
              </button>
            ))}
          </div>
          <div className="flex max-h-48 flex-col overflow-y-auto">
            {minuteOptions(minute).map((option) => (
              <button
                key={option}
                type="button"
                className={columnButtonClass(option === minute)}
                onClick={() => onChange(toValue(hour24, option))}
              >
                {String(option).padStart(2, "0")}
              </button>
            ))}
          </div>
          <div className="flex flex-col">
            {(["AM", "PM"] as const).map((period) => (
              <button
                key={period}
                type="button"
                className={columnButtonClass(period === "PM" ? isPm : !isPm)}
                onClick={() =>
                  onChange(toValue(toHour24(hour12, period === "PM"), minute))
                }
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
