export const TOUR_TIMEZONE = "America/Mexico_City";

const pad2 = (value: number): string => String(value).padStart(2, "0");

/** YYYY-MM-DD from a DayPicker / local calendar Date. */
export const toCalendarDateKey = (date: Date): string =>
  `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

/** Noon Date for a YYYY-MM-DD key (avoids DST midnight shifts in DayPicker). */
export const parseCalendarDateKey = (dateKey: string): Date => {
  const [yearStr, monthStr, dayStr] = dateKey.split("-");
  return new Date(
    Number(yearStr),
    Number(monthStr) - 1,
    Number(dayStr),
    12,
    0,
    0,
  );
};

export const dateKeyInTimeZone = (value: Date, timeZone: string): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);

export const dateKeyInTourZone = (value: Date): string =>
  dateKeyInTimeZone(value, TOUR_TIMEZONE);

export const formatTourTime = (value: Date, locale?: string): string =>
  value.toLocaleTimeString(locale, {
    timeZone: TOUR_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export const formatTourTimeShort = (value: Date, locale?: string): string =>
  value.toLocaleTimeString(locale, {
    timeZone: TOUR_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
  });

export const formatTourDateTime = (value: Date, locale?: string): string =>
  value.toLocaleString(locale, {
    timeZone: TOUR_TIMEZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatTourDateFull = (value: Date, locale?: string): string =>
  value.toLocaleString(locale, {
    timeZone: TOUR_TIMEZONE,
    dateStyle: "full",
    timeStyle: "short",
  });

export const calendarDateKeyFromDbDate = (value: Date | string): string => {
  if (typeof value === "string") {
    return value.slice(0, 10);
  }
  return `${value.getUTCFullYear()}-${pad2(value.getUTCMonth() + 1)}-${pad2(value.getUTCDate())}`;
};

export const addCalendarDays = (dateKey: string, days: number): string => {
  const [yearStr, monthStr, dayStr] = dateKey.split("-");
  const date = new Date(
    Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr) + days),
  );
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
};

/** 0 = Sunday. Matches react-day-picker locales used in the app. */
export const firstWeekdayForLocale = (locale: string): 0 | 1 =>
  locale.startsWith("es") ? 1 : 0;

export const startOfWeekKey = (
  dateKey: string,
  firstWeekday: number,
): string => {
  const [yearStr, monthStr, dayStr] = dateKey.split("-");
  const weekday = new Date(
    Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr)),
  ).getUTCDay();
  const delta = (weekday - firstWeekday + 7) % 7;
  return addCalendarDays(dateKey, -delta);
};

export const weekDateKeys = (
  anchorKey: string,
  firstWeekday: number,
): string[] => {
  const start = startOfWeekKey(anchorKey, firstWeekday);
  return Array.from({ length: 7 }, (_, index) => addCalendarDays(start, index));
};

export interface ZonedDateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: number;
}

const WEEKDAY_TO_NUMBER: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export const zonedDateParts = (
  value: Date,
  timeZone: string = TOUR_TIMEZONE,
): ZonedDateParts => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(value);

  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekday = WEEKDAY_TO_NUMBER[get("weekday")];
  if (weekday === undefined) {
    throw new Error(`Unexpected weekday: ${get("weekday")}`);
  }

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    weekday,
  };
};

export const minutesOfDayInZone = (
  value: Date,
  timeZone: string = TOUR_TIMEZONE,
): number => {
  const parts = zonedDateParts(value, timeZone);
  return parts.hour * 60 + parts.minute;
};

export const formatTourHourLabel = (hour: number, locale?: string): string =>
  new Date(2000, 0, 1, hour, 0).toLocaleTimeString(locale, {
    hour: "numeric",
  });

export const formatCalendarDateKey = (
  dateKey: string,
  locale: string,
  options: Intl.DateTimeFormatOptions,
): string => parseCalendarDateKey(dateKey).toLocaleDateString(locale, options);

export const formatCalendarDateRange = (
  startKey: string,
  endKey: string,
  locale: string,
): string => {
  const start = parseCalendarDateKey(startKey);
  const end = parseCalendarDateKey(endKey);
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (typeof formatter.formatRange === "function") {
    return formatter.formatRange(start, end);
  }
  return `${formatter.format(start)} – ${formatter.format(end)}`;
};

export const visibleHourRange = (
  bookings: { startsAt: Date; endsAt: Date }[],
  timeZone: string = TOUR_TIMEZONE,
): { startHour: number; endHour: number } => {
  let startHour = 7;
  let endHour = 21;
  for (const booking of bookings) {
    const start = zonedDateParts(booking.startsAt, timeZone);
    const end = zonedDateParts(booking.endsAt, timeZone);
    startHour = Math.min(startHour, start.hour);
    const endExclusive =
      end.minute > 0 ? end.hour + 1 : Math.max(end.hour, start.hour + 1);
    endHour = Math.max(endHour, endExclusive);
  }
  return {
    startHour: Math.max(0, startHour),
    endHour: Math.min(24, Math.max(endHour, startHour + 1)),
  };
};
