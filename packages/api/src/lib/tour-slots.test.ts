import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  addCalendarDays,
  calendarDateKey,
  computeAvailableSlots,
  dateKeyInTimeZone,
  dayOfWeekInTimeZone,
  TOUR_TIMEZONE,
  zonedWallTimeToUtc,
} from "./tour-slots";

describe("tour-slots timezone helpers", () => {
  it("calendarDateKey uses UTC date parts for Postgres dates", () => {
    assert.equal(
      calendarDateKey(new Date("2026-03-15T00:00:00.000Z")),
      "2026-03-15",
    );
    assert.equal(calendarDateKey("2026-07-04"), "2026-07-04");
  });

  it("zonedWallTimeToUtc maps Mexico City winter offset (UTC-6)", () => {
    // CST: 2026-01-15 10:00 Mexico City = 16:00 UTC
    const slot = zonedWallTimeToUtc("2026-01-15", 10 * 60, TOUR_TIMEZONE);
    assert.equal(slot.toISOString(), "2026-01-15T16:00:00.000Z");
    assert.equal(dateKeyInTimeZone(slot, TOUR_TIMEZONE), "2026-01-15");
  });

  it("zonedWallTimeToUtc maps Mexico City summer offset (UTC-6, no DST since 2022)", () => {
    const slot = zonedWallTimeToUtc("2026-07-15", 10 * 60, TOUR_TIMEZONE);
    assert.equal(slot.toISOString(), "2026-07-15T16:00:00.000Z");
  });

  it("dayOfWeekInTimeZone matches wall calendar", () => {
    // Thursday 2026-01-15
    const noon = zonedWallTimeToUtc("2026-01-15", 12 * 60);
    assert.equal(dayOfWeekInTimeZone(noon), 4);
  });

  it("addCalendarDays rolls months", () => {
    assert.equal(addCalendarDays("2026-01-31", 1), "2026-02-01");
  });
});

describe("computeAvailableSlots", () => {
  const weekdayHours = [1, 2, 3, 4, 5].map((dayOfWeek) => ({
    dayOfWeek,
    startMinute: 10 * 60,
    endMinute: 12 * 60,
  }));

  it("returns hourly slots in America/Mexico_City", () => {
    const from = zonedWallTimeToUtc("2026-01-15", 0);
    const to = zonedWallTimeToUtc("2026-01-16", 0);
    const now = zonedWallTimeToUtc("2026-01-14", 9 * 60);

    const slots = computeAvailableSlots({
      from,
      to,
      weeklyHours: weekdayHours,
      blockedDateKeys: [],
      existingStarts: [],
      slotMinutes: 60,
      now,
    });

    assert.deepEqual(
      slots.map((slot) => slot.toISOString()),
      ["2026-01-15T16:00:00.000Z", "2026-01-15T17:00:00.000Z"],
    );
  });

  it("skips blocked calendar dates", () => {
    const from = zonedWallTimeToUtc("2026-01-15", 0);
    const to = zonedWallTimeToUtc("2026-01-16", 0);
    const now = zonedWallTimeToUtc("2026-01-14", 9 * 60);

    const slots = computeAvailableSlots({
      from,
      to,
      weeklyHours: weekdayHours,
      blockedDateKeys: ["2026-01-15"],
      existingStarts: [],
      slotMinutes: 60,
      now,
    });

    assert.equal(slots.length, 0);
  });

  it("skips taken starts and past slots", () => {
    const from = zonedWallTimeToUtc("2026-01-15", 0);
    const to = zonedWallTimeToUtc("2026-01-16", 0);
    const taken = zonedWallTimeToUtc("2026-01-15", 10 * 60);
    const now = zonedWallTimeToUtc("2026-01-15", 10 * 60 + 30);

    const slots = computeAvailableSlots({
      from,
      to,
      weeklyHours: weekdayHours,
      blockedDateKeys: [],
      existingStarts: [taken],
      slotMinutes: 60,
      now,
    });

    assert.deepEqual(
      slots.map((slot) => slot.toISOString()),
      ["2026-01-15T17:00:00.000Z"],
    );
  });

  it("skips weekends when only weekday hours are set", () => {
    const from = zonedWallTimeToUtc("2026-01-17", 0); // Saturday
    const to = zonedWallTimeToUtc("2026-01-19", 0); // Monday exclusive end via day loop
    const now = zonedWallTimeToUtc("2026-01-10", 0);

    const slots = computeAvailableSlots({
      from,
      to,
      weeklyHours: weekdayHours,
      blockedDateKeys: [],
      existingStarts: [],
      slotMinutes: 60,
      now,
    });

    assert.equal(slots.length, 0);
  });
});
