import { and, eq, inArray, ne, sql } from "@acme/db";
import { Property, Room, Stay } from "@acme/db/schema";

import type { BookingRange, ScopeListing, StayRecord } from "./availability";
import type { DbExecutor } from "./listing-write";
import { conflictScope, findBookingConflicts } from "./availability";

export interface ScopedStays {
  scopeIds: string[];
  stays: StayRecord[];
}

/** Every active stay on listings that compete with `listing` for space. */
export const loadScopedStays = async (
  database: DbExecutor,
  listing: ScopeListing,
): Promise<ScopedStays> => {
  const siblings: ScopeListing[] =
    listing.propertyId === null
      ? []
      : await database
          .select({
            id: Room.id,
            propertyId: Room.propertyId,
            listingType: Room.listingType,
          })
          .from(Room)
          .where(eq(Room.propertyId, listing.propertyId));

  const scopeIds = conflictScope(listing, siblings);
  const rows = await database
    .select({
      id: Stay.id,
      listingId: Stay.roomId,
      start: Stay.startedAt,
      end: Stay.endedAt,
      status: Stay.status,
    })
    .from(Stay)
    .where(and(inArray(Stay.roomId, scopeIds), ne(Stay.status, "cancelled")));

  return { scopeIds, stays: rows };
};

export const findScopedConflicts = async (
  database: DbExecutor,
  listing: ScopeListing,
  range: BookingRange,
): Promise<StayRecord[]> => {
  const { scopeIds, stays } = await loadScopedStays(database, listing);
  return findBookingConflicts(range, stays, scopeIds);
};

/**
 * Serializes bookings that share a conflict scope: every listing on a
 * property locks the property row; a legacy standalone room locks itself.
 */
export const lockBookingScope = async (
  tx: DbExecutor,
  listing: ScopeListing,
): Promise<void> => {
  if (listing.propertyId !== null) {
    await tx.execute(
      sql`select 1 from ${Property} where ${Property.id} = ${listing.propertyId} for update`,
    );
    return;
  }
  await tx.execute(
    sql`select 1 from ${Room} where ${Room.id} = ${listing.id} for update`,
  );
};
