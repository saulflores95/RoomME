export const TOUR_TIMEZONE = "America/Mexico_City";

export interface WeeklyHourWindow {
  dayOfWeek: number;
  startMinute: number;
  endMinute: number;
}

export interface ComputeSlotsInput {
  from: Date;
  to: Date;
  weeklyHours: WeeklyHourWindow[];
  /** Calendar dates as YYYY-MM-DD in the tour timezone. */
  blockedDateKeys: string[];
  existingStarts: Date[];
  slotMinutes: number;
  timeZone?: string;
  now?: Date;
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

const pad2 = (value: number): string => String(value).padStart(2, "0");

/** Normalize a Postgres `date` (Date at UTC midnight) or YYYY-MM-DD string. */
export const calendarDateKey = (value: Date | string): string => {
  if (typeof value === "string") {
    return value.slice(0, 10);
  }
  return `${value.getUTCFullYear()}-${pad2(value.getUTCMonth() + 1)}-${pad2(value.getUTCDate())}`;
};

export const dateKeyInTimeZone = (
  value: Date,
  timeZone: string = TOUR_TIMEZONE,
): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);

export const dayOfWeekInTimeZone = (
  value: Date,
  timeZone: string = TOUR_TIMEZONE,
): number => {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(value);
  const day = WEEKDAY_TO_NUMBER[weekday];
  if (day === undefined) {
    throw new Error(`Unexpected weekday: ${weekday}`);
  }
  return day;
};

const getTimeZoneOffsetMs = (timeZone: string, date: Date): number => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes): number => {
    const part = parts.find((entry) => entry.type === type)?.value;
    if (!part) {
      throw new Error(`Missing date part: ${type}`);
    }
    return Number(part);
  };

  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  return asUtc - date.getTime();
};

/** Convert a wall-clock time in `timeZone` to a UTC `Date`. */
export const zonedWallTimeToUtc = (
  dateKey: string,
  minuteOfDay: number,
  timeZone: string = TOUR_TIMEZONE,
): Date => {
  const [yearStr, monthStr, dayStr] = dateKey.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day)
  ) {
    throw new Error(`Invalid date key: ${dateKey}`);
  }

  const hour = Math.floor(minuteOfDay / 60);
  const minute = minuteOfDay % 60;
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const offset1 = getTimeZoneOffsetMs(timeZone, new Date(utcGuess));
  const utc1 = utcGuess - offset1;
  const offset2 = getTimeZoneOffsetMs(timeZone, new Date(utc1));
  return new Date(utcGuess - offset2);
};

export const startOfZonedDayUtc = (
  dateKey: string,
  timeZone: string = TOUR_TIMEZONE,
): Date => zonedWallTimeToUtc(dateKey, 0, timeZone);

export const addCalendarDays = (dateKey: string, days: number): string => {
  const [yearStr, monthStr, dayStr] = dateKey.split("-");
  const base = Date.UTC(
    Number(yearStr),
    Number(monthStr) - 1,
    Number(dayStr) + days,
  );
  const date = new Date(base);
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
};

export const eachCalendarDay = (
  fromKey: string,
  toKeyExclusive: string,
): string[] => {
  const keys: string[] = [];
  let cursor = fromKey;
  while (cursor < toKeyExclusive) {
    keys.push(cursor);
    cursor = addCalendarDays(cursor, 1);
  }
  return keys;
};

export const formatTourTime = (
  value: Date,
  locale?: string,
  timeZone: string = TOUR_TIMEZONE,
): string =>
  value.toLocaleTimeString(locale, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export const formatTourDateTime = (
  value: Date,
  locale?: string,
  timeZone: string = TOUR_TIMEZONE,
): string =>
  value.toLocaleString(locale, {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const computeAvailableSlots = (input: ComputeSlotsInput): Date[] => {
  const timeZone = input.timeZone ?? TOUR_TIMEZONE;
  const now = input.now ?? new Date();
  const blocked = new Set(input.blockedDateKeys);
  const taken = new Set(input.existingStarts.map((value) => value.getTime()));

  const fromKey = dateKeyInTimeZone(input.from, timeZone);
  const toKey = dateKeyInTimeZone(input.to, timeZone);
  // If `to` is exactly midnight in the zone, treat it as exclusive end of that day already.
  // Otherwise include through the calendar day of `to` when `to` is end-of-range exclusive
  // by using the date key of `to` as exclusive bound when from/to are day boundaries.
  const days = eachCalendarDay(fromKey, toKey);

  // When `to` falls mid-day, include that calendar day as well if to > start of that day.
  const toDayStart = startOfZonedDayUtc(toKey, timeZone);
  if (input.to.getTime() > toDayStart.getTime() && !days.includes(toKey)) {
    days.push(toKey);
  }

  const slots: Date[] = [];

  for (const dayKey of days) {
    if (blocked.has(dayKey)) {
      continue;
    }

    const noon = zonedWallTimeToUtc(dayKey, 12 * 60, timeZone);
    const dayOfWeek = dayOfWeekInTimeZone(noon, timeZone);
    const windows = input.weeklyHours.filter(
      (hour) => hour.dayOfWeek === dayOfWeek,
    );

    for (const window of windows) {
      for (
        let minute = window.startMinute;
        minute + input.slotMinutes <= window.endMinute;
        minute += input.slotMinutes
      ) {
        const slot = zonedWallTimeToUtc(dayKey, minute, timeZone);
        if (slot < now) {
          continue;
        }
        if (
          slot >= input.from &&
          slot < input.to &&
          !taken.has(slot.getTime())
        ) {
          slots.push(slot);
        }
      }
    }
  }

  return slots;
};
