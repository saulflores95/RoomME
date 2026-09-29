import type {
  BathroomType,
  City,
  Cleanliness,
  Furnished,
  HouseholdGender,
  ListingInclude,
  ListingType,
  OperationType,
  OvernightGuests,
  PropertyType,
  SmokingPolicy,
} from "@acme/validators";
import { LISTING_INCLUDES, MAX_AMENITY_LENGTH } from "@acme/validators";

export interface ListingHost {
  id: string;
  name: string;
  image: string | null;
}

/** Detail pages also expose the creator's WhatsApp number. */
export interface ListingDetailHost extends ListingHost {
  phone: string | null;
}

/** @deprecated Kept for older clients; prefer `property`. */
export interface ListingComplexSummary {
  id: string | null;
  title: string | null;
  city: City;
  neighborhood: string;
  petFriendly: boolean;
  amenities: string[];
}

export interface ListingPropertySummary {
  id: string | null;
  title: string | null;
  propertyType: PropertyType | null;
  bedroomCount: number | null;
  bathroomCount: number | null;
  isSharedBuilding: boolean;
  city: City;
  neighborhood: string;
  petFriendly: boolean;
  amenities: string[];
}

export interface ListingRoomAttributes {
  includes: string[];
  capacity: number;
  householdGender: HouseholdGender;
  preferredAgeMin: number;
  preferredAgeMax: number;
  hasPets: boolean;
  acceptsPets: boolean;
  bathroomType: BathroomType;
  furnished: Furnished;
  depositMonths: number;
  leaseMonths: number;
  couplesAllowed: boolean;
  smokingPolicy: SmokingPolicy;
  overnightGuests: OvernightGuests;
  wfhFriendly: boolean;
  quietHome: boolean;
  cleanliness: Cleanliness;
  availableFrom: Date | null;
}

export interface ListingSummary extends ListingRoomAttributes {
  id: string;
  listingType: ListingType;
  operationType: OperationType;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  coverUrl: string | null;
  addressLine1: string | null;
  latitude: number | null;
  longitude: number | null;
  tourBookingCount: number;
  property: ListingPropertySummary;
  complex: ListingComplexSummary;
  host: ListingHost | null;
}

export interface ListingImage {
  id: string;
  url: string;
  alt: string | null;
}

export interface ListingDetailProperty {
  id: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  bedroomCount: number | null;
  bathroomCount: number | null;
  isSharedBuilding: boolean;
  addressLine1: string;
  city: City;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
  petFriendly: boolean;
  amenities: string[];
  images: ListingImage[];
}

export interface ListingDetail extends ListingRoomAttributes {
  id: string;
  listingType: ListingType;
  operationType: OperationType;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  addressLine1: string | null;
  city: City | null;
  neighborhood: string | null;
  latitude: number | null;
  longitude: number | null;
  coverUrl: string | null;
  images: ListingImage[];
  property: ListingDetailProperty | null;
  /** @deprecated Kept for older clients; prefer `property`. */
  complex: ListingDetailProperty | null;
  host: ListingDetailHost | null;
}

interface ImageRow {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
}

export interface ListingPropertyRow {
  id: string;
  ownerId: string | null;
  propertyType: PropertyType;
  bedroomCount: number | null;
  bathroomCount: number | null;
  title: string;
  description: string;
  city: City;
  neighborhood: string;
  petFriendly: boolean;
  amenities: string[];
  addressLine1: string;
  latitude: number | null;
  longitude: number | null;
  images: ImageRow[];
}

export interface ListingRoomRow extends ListingRoomAttributes {
  id: string;
  listingType: ListingType;
  operationType: OperationType;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  addressLine1: string | null;
  city: City | null;
  neighborhood: string | null;
  latitude: number | null;
  longitude: number | null;
  images: ImageRow[];
  host: HostRow | null | undefined;
  property: ListingPropertyRow | null;
}

interface HostRow extends ListingHost {
  phone?: string | null;
}

export const toListingHost = (
  host: HostRow | null | undefined,
): ListingHost | null =>
  host ? { id: host.id, name: host.name, image: host.image } : null;

export const toListingDetailHost = (
  host: HostRow | null | undefined,
): ListingDetailHost | null =>
  host
    ? {
        id: host.id,
        name: host.name,
        image: host.image,
        phone: host.phone ?? null,
      }
    : null;

export const toRoomAttributes = (
  room: ListingRoomAttributes,
): ListingRoomAttributes => ({
  includes: room.includes,
  capacity: room.capacity,
  householdGender: room.householdGender,
  preferredAgeMin: room.preferredAgeMin,
  preferredAgeMax: room.preferredAgeMax,
  hasPets: room.hasPets,
  acceptsPets: room.acceptsPets,
  bathroomType: room.bathroomType,
  furnished: room.furnished,
  depositMonths: room.depositMonths,
  leaseMonths: room.leaseMonths,
  couplesAllowed: room.couplesAllowed,
  smokingPolicy: room.smokingPolicy,
  overnightGuests: room.overnightGuests,
  wfhFriendly: room.wfhFriendly,
  quietHome: room.quietHome,
  cleanliness: room.cleanliness,
  availableFrom: room.availableFrom,
});

export const toListingIncludes = (values: string[]): ListingInclude[] =>
  values.filter((item): item is ListingInclude =>
    (LISTING_INCLUDES as readonly string[]).includes(item),
  );

export const toPropertyAmenities = (values: string[]): string[] => {
  const seen = new Set<string>();
  const amenities: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_AMENITY_LENGTH) {
      continue;
    }

    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    amenities.push(trimmed);
  }

  return amenities;
};

export const sortedImages = (images: readonly ImageRow[]): ListingImage[] =>
  [...images]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((image) => ({ id: image.id, url: image.url, alt: image.alt }));

export const toListingSummary = (
  room: ListingRoomRow,
  tourBookingCount = 0,
): ListingSummary | null => {
  const { property } = room;
  const city = room.city ?? property?.city;
  const neighborhood = room.neighborhood ?? property?.neighborhood ?? "";

  if (!city) {
    return null;
  }

  const roomImages = sortedImages(room.images);
  const propertyImages = sortedImages(property?.images ?? []);
  const petFriendly = property?.petFriendly ?? room.acceptsPets;
  const amenities = property?.amenities ?? [];

  return {
    id: room.id,
    listingType: room.listingType,
    operationType: room.operationType,
    title: room.title,
    description: room.description,
    priceCents: room.priceCents,
    currency: room.currency,
    coverUrl: roomImages[0]?.url ?? propertyImages[0]?.url ?? null,
    addressLine1: room.addressLine1 ?? property?.addressLine1 ?? null,
    latitude: room.latitude ?? property?.latitude ?? null,
    longitude: room.longitude ?? property?.longitude ?? null,
    tourBookingCount,
    property: {
      id: property?.id ?? null,
      title: property?.title ?? null,
      propertyType: property?.propertyType ?? null,
      bedroomCount: property?.bedroomCount ?? null,
      bathroomCount: property?.bathroomCount ?? null,
      isSharedBuilding: property ? property.ownerId === null : false,
      city,
      neighborhood,
      petFriendly,
      amenities,
    },
    complex: {
      id: property?.id ?? null,
      title: property?.title ?? null,
      city,
      neighborhood,
      petFriendly,
      amenities,
    },
    host: toListingHost(room.host),
    ...toRoomAttributes(room),
  };
};

export const toListingDetail = (room: ListingRoomRow): ListingDetail => {
  const { property } = room;
  const roomImages = sortedImages(room.images);
  const propertyImages = sortedImages(property?.images ?? []);
  const images = roomImages.length > 0 ? roomImages : propertyImages;

  const detailProperty: ListingDetailProperty | null = property
    ? {
        id: property.id,
        title: property.title,
        description: property.description,
        propertyType: property.propertyType,
        bedroomCount: property.bedroomCount,
        bathroomCount: property.bathroomCount,
        isSharedBuilding: property.ownerId === null,
        addressLine1: property.addressLine1,
        city: property.city,
        neighborhood: property.neighborhood,
        latitude: property.latitude,
        longitude: property.longitude,
        petFriendly: property.petFriendly,
        amenities: property.amenities,
        images: propertyImages,
      }
    : null;

  return {
    id: room.id,
    listingType: room.listingType,
    operationType: room.operationType,
    title: room.title,
    description: room.description,
    priceCents: room.priceCents,
    currency: room.currency,
    addressLine1: room.addressLine1 ?? property?.addressLine1 ?? null,
    city: room.city ?? property?.city ?? null,
    neighborhood: room.neighborhood ?? property?.neighborhood ?? null,
    latitude: room.latitude ?? property?.latitude ?? null,
    longitude: room.longitude ?? property?.longitude ?? null,
    coverUrl: images[0]?.url ?? null,
    images,
    property: detailProperty,
    complex: detailProperty,
    host: toListingDetailHost(room.host),
    ...toRoomAttributes(room),
  };
};
