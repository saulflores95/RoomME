import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { CreateListingSchema } from "@acme/validators";

import {
  propertyLocationFromListing,
  propertyValuesFromListing,
  roomWriteValues,
} from "./listing-write";

const roomInput = CreateListingSchema.parse({
  listingType: "room",
  propertyType: "house",
  addressLine1: "Calle Nueva 10",
  city: "queretaro",
  neighborhood: "Centro Sur",
  latitude: 20.57,
  longitude: -100.39,
  title: "Cuarto luminoso",
  description: "Cuarto con baño compartido",
  priceMxn: 8250.5,
  availableFrom: "2026-11-01",
});

describe("propertyLocationFromListing", () => {
  it("only carries location and type for room listings", () => {
    const values = propertyLocationFromListing(roomInput);
    assert.deepEqual(Object.keys(values).sort(), [
      "addressLine1",
      "city",
      "country",
      "latitude",
      "longitude",
      "neighborhood",
      "propertyType",
    ]);
    assert.equal(values.neighborhood, "Centro Sur");
    assert.equal(values.latitude, 20.57);
  });

  it("does not clear the property layout like the full listing values do", () => {
    assert.equal(propertyValuesFromListing(roomInput).bedroomCount, null);
    assert.equal(
      "bedroomCount" in propertyLocationFromListing(roomInput),
      false,
    );
  });
});

describe("roomWriteValues", () => {
  it("stores the price in cents and the property location", () => {
    const values = roomWriteValues(roomInput, "host-1", {
      id: "property-1",
      addressLine1: "Calle Nueva 10",
      city: "queretaro",
      neighborhood: "Centro Sur",
      latitude: 20.57,
      longitude: -100.39,
    });
    assert.equal(values.priceCents, 825_050);
    assert.equal(values.neighborhood, "Centro Sur");
    assert.equal(values.propertyId, "property-1");
  });
});
