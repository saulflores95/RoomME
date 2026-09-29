const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

const toDate = (value: Date | string): Date | null => {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatDate = (value: Date | string): string => {
  const date = toDate(value);
  return date
    ? new Intl.DateTimeFormat(undefined, DATE_FORMAT).format(date)
    : "";
};

/** Formats a `YYYY-MM-DD` key without shifting it through the local timezone. */
export const formatDateKey = (key: string): string => {
  const [year, month, day] = key.split("-").map(Number);
  if (year === undefined || month === undefined || day === undefined) {
    return key;
  }
  return new Intl.DateTimeFormat(undefined, {
    ...DATE_FORMAT,
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
};

export const formatAvailable = (
  value: Date | string | null,
  immediately: string,
): string => {
  if (!value) {
    return immediately;
  }
  const formatted = formatDate(value);
  return formatted.length > 0 ? formatted : immediately;
};

export const formatRange = (
  start: Date | string,
  end: Date | string | null,
  openEnded: string,
): string => `${formatDate(start)} – ${end ? formatDate(end) : openEnded}`;
