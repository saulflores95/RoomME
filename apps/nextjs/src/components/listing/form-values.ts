import type { RouterOutputs } from "@acme/api";
import type {
  CreateListingInput,
  LeaseMonths,
  ListingFormValues,
  ListingInclude,
  PropertyFormValues,
} from "@acme/validators";
import {
  LEASE_MONTHS,
  LISTING_INCLUDES,
  NONE_PROPERTY_ID,
} from "@acme/validators";

type RoomForEdit = RouterOutputs["listing"]["roomForEdit"];
type PropertyForEdit = RouterOutputs["listing"]["propertyForEdit"];

export const todayInputValue = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const parseDateInput = (value: string): Date => {
  const [year, month, day] = value.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

const toDateInputValue = (value: Date | null): string => {
  if (!value) {
    return todayInputValue();
  }

  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${value.getFullYear()}-${month}-${day}`;
};

const isLeaseMonths = (value: number): value is LeaseMonths =>
  LEASE_MONTHS.some((item) => item === value);

const toListingIncludes = (values: string[]): ListingInclude[] =>
  values.filter((item): item is ListingInclude =>
    LISTING_INCLUDES.some((include) => include === item),
  );

export const listingFormDefaults = (
  listingType: ListingFormValues["listingType"] = "room",
): ListingFormValues => ({
  listingType,
  operationType: "rent",
  propertyType: listingType === "room" ? "house" : "apartment",
  propertyId: NONE_PROPERTY_ID,
  bedroomCount: listingType === "room" ? 0 : 1,
  bathroomCount: listingType === "room" ? 0 : 1,
  addressLine1: "",
  city: "queretaro",
  neighborhood: "",
  latitude: undefined,
  longitude: undefined,
  title: "",
  description: "",
  priceMxn: Number.NaN,
  includes: [],
  capacity: listingType === "room" ? 1 : 2,
  householdGender: "mixed",
  preferredAgeMin: 18,
  preferredAgeMax: 35,
  hasPets: false,
  acceptsPets: false,
  bathroomType: "shared",
  furnished: "furnished",
  availableFrom: todayInputValue(),
  depositMonths: 1,
  leaseMonths: 12,
  couplesAllowed: false,
  smokingPolicy: "no",
  overnightGuests: "ask",
  wfhFriendly: false,
  quietHome: false,
  cleanliness: "average",
  images: [],
});

export const propertyFormDefaults = (): PropertyFormValues => ({
  propertyType: "house",
  isSharedBuilding: false,
  title: "",
  description: "",
  addressLine1: "",
  city: "queretaro",
  neighborhood: "",
  latitude: undefined,
  longitude: undefined,
  bedroomCount: undefined,
  bathroomCount: undefined,
  petFriendly: false,
  amenities: [],
  images: [],
});

/**
 * Shared buildings stay selected so the address remains locked. The host's
 * own property is edited in place through the address fields instead.
 */
export const roomToListingFormValues = (
  room: RoomForEdit,
): ListingFormValues => ({
  listingType: room.listingType,
  operationType: room.operationType,
  propertyType: room.propertyType,
  propertyId:
    room.propertyIsShared && room.propertyId
      ? room.propertyId
      : NONE_PROPERTY_ID,
  bedroomCount: room.bedroomCount ?? (room.listingType === "room" ? 0 : 1),
  bathroomCount: room.bathroomCount ?? (room.listingType === "room" ? 0 : 1),
  addressLine1: room.addressLine1,
  city: room.city,
  neighborhood: room.neighborhood,
  latitude: room.latitude ?? undefined,
  longitude: room.longitude ?? undefined,
  title: room.title,
  description: room.description,
  priceMxn: room.priceMxn,
  includes: toListingIncludes(room.includes),
  capacity: room.capacity,
  householdGender: room.householdGender,
  preferredAgeMin: room.preferredAgeMin,
  preferredAgeMax: room.preferredAgeMax,
  hasPets: room.hasPets,
  acceptsPets: room.acceptsPets,
  bathroomType: room.bathroomType,
  furnished: room.furnished,
  availableFrom: toDateInputValue(room.availableFrom),
  depositMonths: room.depositMonths,
  leaseMonths: isLeaseMonths(room.leaseMonths) ? room.leaseMonths : 12,
  couplesAllowed: room.couplesAllowed,
  smokingPolicy: room.smokingPolicy,
  overnightGuests: room.overnightGuests,
  wfhFriendly: room.wfhFriendly,
  quietHome: room.quietHome,
  cleanliness: room.cleanliness,
  images: room.images,
});

export const propertyToFormValues = (
  property: PropertyForEdit,
): PropertyFormValues => ({
  propertyType: property.propertyType,
  isSharedBuilding: property.isSharedBuilding,
  title: property.title,
  description: property.description,
  addressLine1: property.addressLine1,
  city: property.city,
  neighborhood: property.neighborhood,
  latitude: property.latitude ?? undefined,
  longitude: property.longitude ?? undefined,
  bedroomCount: property.bedroomCount ?? undefined,
  bathroomCount: property.bathroomCount ?? undefined,
  petFriendly: property.petFriendly,
  amenities: property.amenities,
  images: property.images,
});

export const toCreateListingInput = (
  values: ListingFormValues,
): CreateListingInput => {
  const attached =
    values.propertyId !== NONE_PROPERTY_ID && values.propertyId.length > 0;
  const isEntire = values.listingType === "entire_property";
  const isRent = values.operationType === "rent";

  return {
    listingType: values.listingType,
    operationType: values.operationType,
    propertyType: values.propertyType,
    propertyId: attached ? values.propertyId : undefined,
    bedroomCount: isEntire ? values.bedroomCount : undefined,
    bathroomCount: isEntire ? values.bathroomCount : undefined,
    addressLine1: values.addressLine1,
    city: values.city,
    neighborhood: values.neighborhood,
    latitude: values.latitude,
    longitude: values.longitude,
    title: values.title,
    description: values.description,
    priceMxn: values.priceMxn,
    includes: isRent ? values.includes : [],
    capacity: values.capacity,
    householdGender: values.householdGender,
    preferredAgeMin: values.preferredAgeMin,
    preferredAgeMax: values.preferredAgeMax,
    hasPets: values.hasPets,
    acceptsPets: values.acceptsPets,
    bathroomType: values.bathroomType,
    furnished: values.furnished,
    availableFrom: parseDateInput(values.availableFrom),
    depositMonths: isRent ? values.depositMonths : 0,
    leaseMonths: values.leaseMonths,
    couplesAllowed: values.couplesAllowed,
    smokingPolicy: values.smokingPolicy,
    overnightGuests: values.overnightGuests,
    wfhFriendly: values.wfhFriendly,
    quietHome: values.quietHome,
    cleanliness: values.cleanliness,
    images: values.images,
  };
};
