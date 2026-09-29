import { startOfZonedDayUtc, TOUR_TIMEZONE } from "./tour-slots";

export type ListingType = "room" | "entire_property";
export type StayStatus = "current" | "past" | "upcoming" | "cancelled";

export interface ScopeListing {
  id: string;
  propertyId: string | null;
  listingType: ListingType;
}

/** Half-open range `[start, end)`. A null end is open-ended. */
export interface BookingRange {
  start: Date;
  end: Date | null;
}

export interface StayRecord extends BookingRange {
  id: string;
  listingId: string;
  status: StayStatus;
}

const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const pad2 = (value: number): string => String(value).padStart(2, "0");

const parseDateKey = (
  dateKey: string,
): { year: number; month: number; day: number } => {
  const match = DATE_KEY_PATTERN.exec(dateKey);
  if (!match) {
    throw new Error(`Invalid date key: ${dateKey}`);
  }
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
};

const daysInMonth = (year: number, month: number): number =>
  new Date(Date.UTC(year, month, 0)).getUTCDate();

/**
 * Calendar end date of a lease (exclusive). Month-end move-ins clamp to the
 * last day of the target month, e.g. Jan 31 + 1 month = Feb 28.
 */
export const leaseEndDate = (
  moveInKey: string,
  leaseMonths: number,
): string => {
  if (!Number.isInteger(leaseMonths) || leaseMonths < 1) {
    throw new Error(`Invalid lease length: ${leaseMonths}`);
  }
  const { year, month, day } = parseDateKey(moveInKey);
  const monthIndex = month - 1 + leaseMonths;
  const targetYear = year + Math.floor(monthIndex / 12);
  const targetMonth = (monthIndex % 12) + 1;
  const targetDay = Math.min(day, daysInMonth(targetYear, targetMonth));
  return `${targetYear}-${pad2(targetMonth)}-${pad2(targetDay)}`;
};

export const leaseRange = (
  moveInKey: string,
  leaseMonths: number,
  timeZone: string = TOUR_TIMEZONE,
): { start: Date; end: Date } => ({
  start: startOfZonedDayUtc(moveInKey, timeZone),
  end: startOfZonedDayUtc(leaseEndDate(moveInKey, leaseMonths), timeZone),
});

export const rangesOverlap = (a: BookingRange, b: BookingRange): boolean => {
  const aEndsAfterBStarts = a.end === null || a.end > b.start;
  const bEndsAfterAStarts = b.end === null || b.end > a.start;
  return aEndsAfterBStarts && bEndsAfterAStarts;
};

/**
 * Listing IDs that compete with `target` for the same physical space:
 * - an entire-property listing competes with every listing on its property;
 * - a room competes with itself and its property's entire-property listings;
 * - a legacy room without a property competes only with itself.
 */
export const conflictScope = (
  target: ScopeListing,
  siblings: readonly ScopeListing[],
): string[] => {
  const ids = new Set<string>([target.id]);
  if (target.propertyId === null) {
    return [...ids];
  }

  for (const sibling of siblings) {
    if (sibling.propertyId !== target.propertyId) {
      continue;
    }
    if (
      target.listingType === "entire_property" ||
      sibling.listingType === "entire_property"
    ) {
      ids.add(sibling.id);
    }
  }

  return [...ids];
};

export const isActiveStay = (stay: { status: StayStatus }): boolean =>
  stay.status !== "cancelled";

export const findBookingConflicts = <T extends StayRecord>(
  range: BookingRange,
  stays: readonly T[],
  scopeIds: readonly string[],
): T[] => {
  const scope = new Set(scopeIds);
  return stays.filter(
    (stay) =>
      isActiveStay(stay) &&
      scope.has(stay.listingId) &&
      rangesOverlap(range, stay),
  );
};

export const stayStatusFor = (
  range: BookingRange,
  now: Date = new Date(),
): Exclude<StayStatus, "cancelled"> => {
  if (range.start > now) {
    return "upcoming";
  }
  if (range.end !== null && range.end <= now) {
    return "past";
  }
  return "current";
};
