import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { ListingFormValues } from "./index";
import {
  ApplyToListingSchema,
  CreateListingSchema,
  ListingFormSchema,
  NONE_PROPERTY_ID,
} from "./index";

const baseCreate = {
  addressLine1: "Calle 1",
  city: "queretaro",
  neighborhood: "Centro",
  latitude: 20.5,
  longitude: -100.4,
  title: "Listing",
  description: "Nice place",
  priceMxn: 8000,
  availableFrom: "2026-10-01",
} as const;

const baseForm: ListingFormValues = {
  listingType: "room",
  operationType: "rent",
  propertyType: "house",
  propertyId: NONE_PROPERTY_ID,
  bedroomCount: 0,
  bathroomCount: 0,
  addressLine1: "Calle 1",
  city: "queretaro",
  neighborhood: "Centro",
  latitude: 20.5,
  longitude: -100.4,
  title: "Listing",
  description: "Nice place",
  priceMxn: 8000,
  includes: [],
  capacity: 1,
  householdGender: "mixed",
  preferredAgeMin: 18,
  preferredAgeMax: 35,
  hasPets: false,
  acceptsPets: false,
  bathroomType: "shared",
  furnished: "furnished",
  availableFrom: "2026-10-01",
  depositMonths: 1,
  leaseMonths: 12,
  couplesAllowed: false,
  smokingPolicy: "no",
  overnightGuests: "ask",
  wfhFriendly: false,
  quietHome: false,
  cleanliness: "average",
  images: [],
};

const issuePaths = (result: {
  success: boolean;
  error?: { issues: { path: PropertyKey[] }[] };
}): string[] => result.error?.issues.map((issue) => issue.path.join(".")) ?? [];

describe("CreateListingSchema", () => {
  it("defaults to a room listing", () => {
    const parsed = CreateListingSchema.parse(baseCreate);
    assert.equal(parsed.listingType, "room");
  });

  it("does not require bedrooms for a room", () => {
    assert.equal(CreateListingSchema.safeParse(baseCreate).success, true);
  });

  it("requires bedrooms and bathrooms for an entire property", () => {
    const result = CreateListingSchema.safeParse({
      ...baseCreate,
      listingType: "entire_property",
    });
    assert.equal(result.success, false);
    assert.deepEqual(issuePaths(result).sort(), [
      "bathroomCount",
      "bedroomCount",
    ]);
  });

  it("accepts an entire property with a layout", () => {
    const result = CreateListingSchema.safeParse({
      ...baseCreate,
      listingType: "entire_property",
      propertyType: "apartment",
      bedroomCount: 2,
      bathroomCount: 1.5,
    });
    assert.equal(result.success, true);
  });

  it("rejects fractional bathrooms other than halves", () => {
    const result = CreateListingSchema.safeParse({
      ...baseCreate,
      listingType: "entire_property",
      bedroomCount: 2,
      bathroomCount: 1.3,
    });
    assert.equal(result.success, false);
  });

  it("only validates the age range for rooms", () => {
    const inverted = { preferredAgeMin: 40, preferredAgeMax: 20 };
    assert.equal(
      CreateListingSchema.safeParse({ ...baseCreate, ...inverted }).success,
      false,
    );
    assert.equal(
      CreateListingSchema.safeParse({
        ...baseCreate,
        ...inverted,
        listingType: "entire_property",
        bedroomCount: 1,
        bathroomCount: 1,
      }).success,
      true,
    );
  });

  it("skips the map pin when attaching to an existing property", () => {
    const { latitude: _lat, longitude: _lng, ...withoutPin } = baseCreate;
    assert.equal(CreateListingSchema.safeParse(withoutPin).success, false);
    assert.equal(
      CreateListingSchema.safeParse({
        ...withoutPin,
        propertyId: "5f1c7a2e-4b1d-4c3a-9a8e-2b6f0d1e3c4a",
      }).success,
      true,
    );
  });

  it("defaults to a rent listing", () => {
    const parsed = CreateListingSchema.parse(baseCreate);
    assert.equal(parsed.operationType, "rent");
  });

  it("accepts an entire property for sale without lease fields", () => {
    const result = CreateListingSchema.safeParse({
      ...baseCreate,
      listingType: "entire_property",
      operationType: "sale",
      priceMxn: 4_850_000,
      bedroomCount: 3,
      bathroomCount: 2.5,
    });
    assert.equal(result.success, true);
  });

  it("rejects a room listed for sale", () => {
    const result = CreateListingSchema.safeParse({
      ...baseCreate,
      operationType: "sale",
    });
    assert.deepEqual(issuePaths(result), ["operationType"]);
  });
});

describe("ListingFormSchema", () => {
  it("rejects a room listed for sale", () => {
    const result = ListingFormSchema.safeParse({
      ...baseForm,
      operationType: "sale",
    });
    assert.deepEqual(issuePaths(result), ["operationType"]);
  });

  it("accepts a room with zero bedroom count", () => {
    assert.equal(ListingFormSchema.safeParse(baseForm).success, true);
  });

  it("requires layout for an entire property", () => {
    const result = ListingFormSchema.safeParse({
      ...baseForm,
      listingType: "entire_property",
    });
    assert.deepEqual(issuePaths(result).sort(), [
      "bathroomCount",
      "bedroomCount",
    ]);
  });

  it("requires an address when no property is selected", () => {
    const result = ListingFormSchema.safeParse({
      ...baseForm,
      addressLine1: "",
    });
    assert.deepEqual(issuePaths(result), ["addressLine1"]);
  });
});

describe("ApplyToListingSchema", () => {
  it("validates the move-in date and lease length", () => {
    const valid = {
      roomId: "5f1c7a2e-4b1d-4c3a-9a8e-2b6f0d1e3c4a",
      moveInDate: "2026-11-01",
      leaseMonths: 6,
    };
    assert.equal(ApplyToListingSchema.safeParse(valid).success, true);
    assert.equal(
      ApplyToListingSchema.safeParse({ ...valid, leaseMonths: 5 }).success,
      false,
    );
    assert.equal(
      ApplyToListingSchema.safeParse({ ...valid, moveInDate: "11/01/2026" })
        .success,
      false,
    );
  });

  it("allows a message-only inquiry for sale listings", () => {
    assert.equal(
      ApplyToListingSchema.safeParse({
        roomId: "5f1c7a2e-4b1d-4c3a-9a8e-2b6f0d1e3c4a",
        message: "Me interesa la casa",
      }).success,
      true,
    );
  });
});
