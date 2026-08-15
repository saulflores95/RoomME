export interface CalendarEventInput {
  uid: string;
  title: string;
  description: string;
  location: string;
  startsAt: Date;
  endsAt: Date;
}

export interface TourCalendarSource {
  id: string;
  roomTitle: string;
  roomNeighborhood: string | null;
  roomCity: string | null;
  roomAddressLine1?: string | null;
  agentName: string;
  startsAt: Date | string;
  endsAt: Date | string;
}

const ICS_LINE_LIMIT = 74;

export const toIcsUtcStamp = (value: Date): string =>
  value
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

export const escapeIcsText = (value: string): string =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const foldIcsLine = (line: string): string => {
  if (line.length <= ICS_LINE_LIMIT) {
    return line;
  }
  const chunks: string[] = [line.slice(0, ICS_LINE_LIMIT)];
  let remaining = line.slice(ICS_LINE_LIMIT);
  while (remaining.length > 0) {
    chunks.push(` ${remaining.slice(0, ICS_LINE_LIMIT - 1)}`);
    remaining = remaining.slice(ICS_LINE_LIMIT - 1);
  }
  return chunks.join("\r\n");
};

export const tourLocation = (source: TourCalendarSource): string =>
  [source.roomAddressLine1, source.roomNeighborhood, source.roomCity]
    .filter((part): part is string => Boolean(part && part.length > 0))
    .join(", ");

export const toTourCalendarEvent = (
  source: TourCalendarSource,
  copy: { title: string; description: string },
): CalendarEventInput => ({
  uid: `tour-${source.id}@roomme`,
  title: copy.title,
  description: copy.description,
  location: tourLocation(source),
  startsAt: new Date(source.startsAt),
  endsAt: new Date(source.endsAt),
});

export const buildIcsCalendar = (events: CalendarEventInput[]): string => {
  const stamp = toIcsUtcStamp(new Date());
  const vevents = events.flatMap((event) =>
    [
      "BEGIN:VEVENT",
      `UID:${event.uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toIcsUtcStamp(event.startsAt)}`,
      `DTEND:${toIcsUtcStamp(event.endsAt)}`,
      `SUMMARY:${escapeIcsText(event.title)}`,
      `DESCRIPTION:${escapeIcsText(event.description)}`,
      `LOCATION:${escapeIcsText(event.location)}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
    ].map(foldIcsLine),
  );

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RoomME//Tours//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...vevents,
    "END:VCALENDAR",
  ].join("\r\n");
};

export const googleCalendarUrl = (event: CalendarEventInput): string => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toIcsUtcStamp(event.startsAt)}/${toIcsUtcStamp(event.endsAt)}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadIcsFile = (ics: string, filename: string): void => {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};
