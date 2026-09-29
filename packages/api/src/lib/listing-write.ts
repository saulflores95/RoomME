import type { db } from "@acme/db/client";
import type {
  BathroomType,
  City,
  Cleanliness,
  CreateListingInput,
  CreatePropertyInput,
  Furnished,
  HouseholdGender,
  ListingType,
  OperationType,
  OvernightGuests,
  PropertyType,
  SmokingPolicy,
} from "@acme/validators";
import { PropertyImage, RoomImage } from "@acme/db/schema";

import { toPropertyAmenities } from "./listing-mappers";

export type Database = typeof db;
export type Transaction = Parameters<Parameters<Database["transaction"]>[0]>[0];
export type DbExecutor = Database | Transaction;

export interface PropertyLocation {
  id: string;
  addressLine1: string;
  city: City;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
}

export interface RoomWriteValues {
  hostId: string;
  propertyId: string;
  listingType: ListingType;
  operationType: OperationType;
  title: string;
  description: string;
  addressLine1: string;
  city: City;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
  country: "MX";
  priceCents: number;
  currency: "MXN";
  includes: CreateListingInput["includes"];
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
  availableFrom: Date;
}

type RoomOnlyValues = Pick<
  RoomWriteValues,
  | "householdGender"
  | "preferredAgeMin"
  | "preferredAgeMax"
  | "hasPets"
  | "bathroomType"
  | "overnightGuests"
  | "wfhFriendly"
  | "quietHome"
  | "cleanliness"
>;

/** Neutral values stored for fields that do not apply to entire properties. */
const ENTIRE_PROPERTY_ROOM_VALUES: RoomOnlyValues = {
  householdGender: "mixed",
  preferredAgeMin: 18,
  preferredAgeMax: 99,
  hasPets: false,
  bathroomType: "private",
  overnightGuests: "yes",
  wfhFriendly: false,
  quietHome: false,
  cleanliness: "average",
};

const roomOnlyValues = (input: CreateListingInput): RoomOnlyValues =>
  input.listingType === "room"
    ? {
        householdGender: input.householdGender,
        preferredAgeMin: input.preferredAgeMin,
        preferredAgeMax: input.preferredAgeMax,
        hasPets: input.hasPets,
        bathroomType: input.bathroomType,
        overnightGuests: input.overnightGuests,
        wfhFriendly: input.wfhFriendly,
        quietHome: input.quietHome,
        cleanliness: input.cleanliness,
      }
    : ENTIRE_PROPERTY_ROOM_VALUES;

type RentOnlyValues = Pick<
  RoomWriteValues,
  "includes" | "depositMonths" | "leaseMonths"
>;

/** Neutral values stored for lease fields that do not apply to sales. */
const SALE_RENT_VALUES: RentOnlyValues = {
  includes: [],
  depositMonths: 0,
  leaseMonths: 12,
};

const rentOnlyValues = (input: CreateListingInput): RentOnlyValues =>
  input.operationType === "rent"
    ? {
        includes: input.includes,
        depositMonths: input.depositMonths,
        leaseMonths: input.leaseMonths,
      }
    : SALE_RENT_VALUES;

export const roomWriteValues = (
  input: CreateListingInput,
  hostId: string,
  property: PropertyLocation,
): RoomWriteValues => ({
  hostId,
  propertyId: property.id,
  listingType: input.listingType,
  operationType: input.operationType,
  title: input.title,
  description: input.description,
  addressLine1: property.addressLine1,
  city: property.city,
  neighborhood: property.neighborhood,
  latitude: property.latitude,
  longitude: property.longitude,
  country: "MX",
  priceCents: Math.round(input.priceMxn * 100),
  currency: "MXN",
  capacity: input.capacity,
  acceptsPets: input.acceptsPets,
  furnished: input.furnished,
  couplesAllowed: input.couplesAllowed,
  smokingPolicy: input.smokingPolicy,
  availableFrom: input.availableFrom,
  ...roomOnlyValues(input),
  ...rentOnlyValues(input),
});

export interface PropertyWriteValues {
  propertyType: PropertyType;
  title: string;
  description: string;
  addressLine1: string;
  city: City;
  neighborhood: string;
  country: "MX";
  latitude: number | null;
  longitude: number | null;
  bedroomCount: number | null;
  bathroomCount: number | null;
  petFriendly: boolean;
}

/** Property fields derived from the listing form when no property is picked. */
export const propertyValuesFromListing = (
  input: CreateListingInput,
): PropertyWriteValues => ({
  propertyType: input.propertyType,
  title: input.title,
  description: input.description,
  addressLine1: input.addressLine1,
  city: input.city,
  neighborhood: input.neighborhood,
  country: "MX",
  latitude: input.latitude ?? null,
  longitude: input.longitude ?? null,
  bedroomCount: input.bedroomCount ?? null,
  bathroomCount: input.bathroomCount ?? null,
  petFriendly: input.acceptsPets,
});

/** Layout fields the listing form may update on an existing property. */
export const propertyLayoutFromListing = (
  input: CreateListingInput,
): Pick<
  PropertyWriteValues,
  "propertyType" | "bedroomCount" | "bathroomCount"
> => ({
  propertyType: input.propertyType,
  bedroomCount: input.bedroomCount ?? null,
  bathroomCount: input.bathroomCount ?? null,
});

export const propertyValuesFromForm = (
  input: CreatePropertyInput,
): PropertyWriteValues & { amenities: string[] } => ({
  propertyType: input.propertyType,
  title: input.title,
  description: input.description,
  addressLine1: input.addressLine1,
  city: input.city,
  neighborhood: input.neighborhood,
  country: "MX",
  latitude: input.latitude ?? null,
  longitude: input.longitude ?? null,
  bedroomCount: input.bedroomCount ?? null,
  bathroomCount: input.bathroomCount ?? null,
  petFriendly: input.petFriendly,
  amenities: toPropertyAmenities(input.amenities),
});

export const insertRoomImages = async (
  database: DbExecutor,
  roomId: string,
  urls: readonly string[],
  alt: string,
): Promise<void> => {
  if (urls.length === 0) {
    return;
  }

  await database.insert(RoomImage).values(
    urls.map((url, index) => ({
      roomId,
      url,
      alt,
      kind: "room" as const,
      sortOrder: index,
    })),
  );
};

export const insertPropertyImages = async (
  database: DbExecutor,
  propertyId: string,
  urls: readonly string[],
  alt: string,
): Promise<void> => {
  if (urls.length === 0) {
    return;
  }

  await database.insert(PropertyImage).values(
    urls.map((url, index) => ({
      propertyId,
      url,
      alt,
      kind: "exterior" as const,
      sortOrder: index,
    })),
  );
};
