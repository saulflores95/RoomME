import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { ScopeListing, StayRecord } from "./availability";
import {
  conflictScope,
  findBookingConflicts,
  leaseEndDate,
  leaseRange,
  rangesOverlap,
  stayStatusFor,
} from "./availability";

const day = (key: string): Date => new Date(`${key}T06:00:00.000Z`);

const roomA: ScopeListing = {
  id: "room-a",
  propertyId: "house",
  listingType: "room",
};
const roomB: ScopeListing = {
  id: "room-b",
  propertyId: "house",
  listingType: "room",
};
const wholeHouse: ScopeListing = {
  id: "whole-house",
  propertyId: "house",
  listingType: "entire_property",
};
const otherPropertyRoom: ScopeListing = {
  id: "other-room",
  propertyId: "other",
  listingType: "room",
};
const legacyRoom: ScopeListing = {
  id: "legacy",
  propertyId: null,
  listingType: "room",
};
const allListings = [roomA, roomB, wholeHouse, otherPropertyRoom, legacyRoom];

const stay = (
  listingId: string,
  start: string,
  end: string | null,
  status: StayRecord["status"] = "upcoming",
): StayRecord => ({
  id: `${listingId}-${start}`,
  listingId,
  start: day(start),
  end: end === null ? null : day(end),
  status,
});

const conflictsFor = (
  target: ScopeListing,
  start: string,
  end: string | null,
  stays: StayRecord[],
): StayRecord[] =>
  findBookingConflicts(
    { start: day(start), end: end === null ? null : day(end) },
    stays,
    conflictScope(target, allListings),
  );

describe("leaseEndDate", () => {
  it("adds calendar months", () => {
    assert.equal(leaseEndDate("2026-03-15", 1), "2026-04-15");
    assert.equal(leaseEndDate("2026-03-15", 12), "2027-03-15");
  });

  it("crosses year boundaries", () => {
    assert.equal(leaseEndDate("2026-11-01", 3), "2027-02-01");
  });

  it("clamps month-end move-ins", () => {
    assert.equal(leaseEndDate("2026-01-31", 1), "2026-02-28");
    assert.equal(leaseEndDate("2027-12-31", 2), "2028-02-29");
  });

  it("rejects invalid input", () => {
    assert.throws(() => leaseEndDate("2026-01-01", 0));
    assert.throws(() => leaseEndDate("01/01/2026", 1));
  });

  it("leaseRange starts and ends at local midnight", () => {
    const range = leaseRange("2026-01-15", 1);
    assert.equal(range.start.toISOString(), "2026-01-15T06:00:00.000Z");
    assert.equal(range.end.toISOString(), "2026-02-15T06:00:00.000Z");
  });
});

describe("rangesOverlap", () => {
  it("treats ranges as half-open", () => {
    const first = { start: day("2026-01-01"), end: day("2026-02-01") };
    const next = { start: day("2026-02-01"), end: day("2026-03-01") };
    assert.equal(rangesOverlap(first, next), false);
    assert.equal(rangesOverlap(next, first), false);
  });

  it("detects partial and nested overlaps", () => {
    const lease = { start: day("2026-01-01"), end: day("2026-06-01") };
    assert.equal(
      rangesOverlap(lease, {
        start: day("2026-05-01"),
        end: day("2026-07-01"),
      }),
      true,
    );
    assert.equal(
      rangesOverlap(lease, {
        start: day("2026-02-01"),
        end: day("2026-03-01"),
      }),
      true,
    );
  });

  it("treats a null end as open-ended", () => {
    const openEnded = { start: day("2026-01-01"), end: null };
    assert.equal(
      rangesOverlap(openEnded, { start: day("2030-01-01"), end: null }),
      true,
    );
    assert.equal(
      rangesOverlap(openEnded, {
        start: day("2025-01-01"),
        end: day("2026-01-01"),
      }),
      false,
    );
  });
});

describe("conflictScope", () => {
  it("room competes with itself and the entire-property listing", () => {
    assert.deepEqual(conflictScope(roomA, allListings).sort(), [
      "room-a",
      "whole-house",
    ]);
  });

  it("entire property competes with every listing on the property", () => {
    assert.deepEqual(conflictScope(wholeHouse, allListings).sort(), [
      "room-a",
      "room-b",
      "whole-house",
    ]);
  });

  it("legacy room without a property only competes with itself", () => {
    assert.deepEqual(conflictScope(legacyRoom, allListings), ["legacy"]);
  });
});

describe("booking conflicts: private room", () => {
  it("conflicts with an overlapping lease on the same room", () => {
    const stays = [stay("room-a", "2026-01-01", "2026-07-01")];
    assert.equal(
      conflictsFor(roomA, "2026-06-01", "2026-12-01", stays).length,
      1,
    );
  });

  it("allows back-to-back leases on the same room", () => {
    const stays = [stay("room-a", "2026-01-01", "2026-07-01")];
    assert.equal(
      conflictsFor(roomA, "2026-07-01", "2027-01-01", stays).length,
      0,
    );
  });

  it("ignores cancelled stays", () => {
    const stays = [stay("room-a", "2026-01-01", "2026-07-01", "cancelled")];
    assert.equal(
      conflictsFor(roomA, "2026-02-01", "2026-03-01", stays).length,
      0,
    );
  });

  it("does not conflict with a sibling room on the same property", () => {
    const stays = [stay("room-b", "2026-01-01", "2026-07-01", "current")];
    assert.equal(
      conflictsFor(roomA, "2026-02-01", "2026-08-01", stays).length,
      0,
    );
  });

  it("conflicts when the entire property is leased", () => {
    const stays = [stay("whole-house", "2026-01-01", "2027-01-01")];
    assert.equal(
      conflictsFor(roomA, "2026-06-01", "2026-09-01", stays).length,
      1,
    );
  });

  it("conflicts with an open-ended stay", () => {
    const stays = [stay("room-a", "2025-01-01", null, "current")];
    assert.equal(
      conflictsFor(roomA, "2030-01-01", "2030-02-01", stays).length,
      1,
    );
  });

  it("does not look at other properties", () => {
    const stays = [stay("other-room", "2026-01-01", "2027-01-01")];
    assert.equal(
      conflictsFor(roomA, "2026-01-01", "2027-01-01", stays).length,
      0,
    );
  });

  it("legacy room only conflicts with its own stays", () => {
    const stays = [
      stay("whole-house", "2026-01-01", "2027-01-01"),
      stay("legacy", "2026-03-01", "2026-04-01"),
    ];
    assert.deepEqual(
      conflictsFor(legacyRoom, "2026-01-01", "2027-01-01", stays).map(
        (item) => item.listingId,
      ),
      ["legacy"],
    );
  });
});

describe("booking conflicts: entire property", () => {
  it("conflicts with any room lease on the property", () => {
    const stays = [stay("room-b", "2026-03-01", "2026-04-01")];
    assert.equal(
      conflictsFor(wholeHouse, "2026-01-01", "2027-01-01", stays).length,
      1,
    );
  });

  it("conflicts with an existing entire-property lease", () => {
    const stays = [stay("whole-house", "2026-01-01", "2026-07-01")];
    assert.equal(
      conflictsFor(wholeHouse, "2026-06-01", "2026-12-01", stays).length,
      1,
    );
  });

  it("is available once every room lease has ended", () => {
    const stays = [
      stay("room-a", "2025-01-01", "2026-01-01", "past"),
      stay("room-b", "2025-06-01", "2026-01-01", "past"),
    ];
    assert.equal(
      conflictsFor(wholeHouse, "2026-01-01", "2027-01-01", stays).length,
      0,
    );
  });
});

describe("stayStatusFor", () => {
  const now = day("2026-06-15");

  it("classifies upcoming, current and past ranges", () => {
    assert.equal(
      stayStatusFor({ start: day("2026-07-01"), end: null }, now),
      "upcoming",
    );
    assert.equal(
      stayStatusFor({ start: day("2026-06-01"), end: day("2026-07-01") }, now),
      "current",
    );
    assert.equal(
      stayStatusFor({ start: day("2026-01-01"), end: day("2026-06-01") }, now),
      "past",
    );
  });
});
