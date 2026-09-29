import type { ListingType, PropertyType } from "@acme/validators";
import { PROPERTY_TYPES } from "@acme/validators";

/** A whole hotel or apartment building is not rented as a single unit. */
const NOT_RENTED_WHOLE: readonly PropertyType[] = ["building", "hotel"];

export const propertyTypesFor = (
  listingType: ListingType,
): readonly PropertyType[] =>
  listingType === "entire_property"
    ? PROPERTY_TYPES.filter((type) => !NOT_RENTED_WHOLE.includes(type))
    : PROPERTY_TYPES;

export const isPropertyTypeAllowed = (
  listingType: ListingType,
  propertyType: PropertyType,
): boolean => propertyTypesFor(listingType).includes(propertyType);
