export interface RoomsMapListing {
  id: string;
  latitude: number | null;
  longitude: number | null;
  complexId: string | null;
}

export interface RoomsMapCluster {
  key: string;
  number: number;
  latitude: number;
  longitude: number;
  listingIds: string[];
}

const roundCoord = (value: number): number => Math.round(value * 10000) / 10000;

export const clusterListings = (
  listings: RoomsMapListing[],
): RoomsMapCluster[] => {
  const groups = new Map<
    string,
    { latitude: number; longitude: number; listingIds: string[] }
  >();

  for (const listing of listings) {
    if (listing.latitude === null || listing.longitude === null) {
      continue;
    }

    const key =
      listing.complexId ??
      `${roundCoord(listing.latitude)}:${roundCoord(listing.longitude)}`;
    const existing = groups.get(key);
    if (existing) {
      existing.listingIds.push(listing.id);
      continue;
    }

    groups.set(key, {
      latitude: listing.latitude,
      longitude: listing.longitude,
      listingIds: [listing.id],
    });
  }

  return [...groups.entries()].map(([key, group], index) => ({
    key,
    number: index + 1,
    latitude: group.latitude,
    longitude: group.longitude,
    listingIds: group.listingIds,
  }));
};
