import type { RouterOutputs } from "@acme/api";
import type {
  ComplexFormValues,
  CreateListingInput,
  LeaseMonths,
  ListingFormValues,
  ListingInclude,
} from "@acme/validators";
import {
  LEASE_MONTHS,
  LISTING_INCLUDES,
  NONE_COMPLEX_ID,
} from "@acme/validators";

type RoomForEdit = RouterOutputs["listing"]["roomForEdit"];
type ComplexForEdit = RouterOutputs["listing"]["complexForEdit"];

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

export const listingFormDefaults = (): ListingFormValues => ({
  isComplex: false,
  complexId: NONE_COMPLEX_ID,
  addressLine1: "",
  city: "cdmx",
  neighborhood: "",
  latitude: undefined,
  longitude: undefined,
  roomTitle: "",
  roomDescription: "",
  rentPriceMxn: Number.NaN,
  includes: [],
  capacity: 1,
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

export const complexFormDefaults = (): ComplexFormValues => ({
  title: "",
  description: "",
  addressLine1: "",
  city: "cdmx",
  neighborhood: "",
  latitude: undefined,
  longitude: undefined,
  petFriendly: false,
  amenities: [],
  images: [],
});

export const roomToListingFormValues = (
  room: RoomForEdit,
): ListingFormValues => ({
  isComplex: room.complexId !== null,
  complexId: room.complexId ?? NONE_COMPLEX_ID,
  addressLine1: room.addressLine1,
  city: room.city,
  neighborhood: room.neighborhood,
  latitude: room.latitude ?? undefined,
  longitude: room.longitude ?? undefined,
  roomTitle: room.title,
  roomDescription: room.description,
  rentPriceMxn: room.rentPriceMxn,
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

export const complexToFormValues = (
  complex: ComplexForEdit,
): ComplexFormValues => ({
  title: complex.title,
  description: complex.description,
  addressLine1: complex.addressLine1,
  city: complex.city,
  neighborhood: complex.neighborhood,
  latitude: complex.latitude ?? undefined,
  longitude: complex.longitude ?? undefined,
  petFriendly: complex.petFriendly,
  amenities: complex.amenities,
  images: complex.images,
});

export const toCreateListingInput = (
  values: ListingFormValues,
): CreateListingInput => {
  const attached =
    values.isComplex &&
    values.complexId !== NONE_COMPLEX_ID &&
    values.complexId.length > 0;

  return {
    isComplex: values.isComplex,
    complexId: attached ? values.complexId : undefined,
    addressLine1: values.addressLine1,
    city: values.city,
    neighborhood: values.neighborhood,
    latitude: values.latitude,
    longitude: values.longitude,
    roomTitle: values.roomTitle,
    roomDescription: values.roomDescription,
    rentPriceMxn: values.rentPriceMxn,
    includes: values.includes,
    capacity: values.capacity,
    householdGender: values.householdGender,
    preferredAgeMin: values.preferredAgeMin,
    preferredAgeMax: values.preferredAgeMax,
    hasPets: values.hasPets,
    acceptsPets: values.acceptsPets,
    bathroomType: values.bathroomType,
    furnished: values.furnished,
    availableFrom: parseDateInput(values.availableFrom),
    depositMonths: values.depositMonths,
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
