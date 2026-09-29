import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isValidPhone, normalizePhone, PhoneSchema } from "./index";

describe("PhoneSchema", () => {
  it("normalizes formatted numbers to E.164", () => {
    assert.equal(PhoneSchema.parse(" +52 (442) 123-4567 "), "+524421234567");
  });

  it("rejects numbers without a country code", () => {
    assert.equal(PhoneSchema.safeParse("4421234567").success, false);
  });

  it("rejects numbers that are too short or contain letters", () => {
    assert.equal(PhoneSchema.safeParse("+52123").success, false);
    assert.equal(PhoneSchema.safeParse("+52 442 abc 4567").success, false);
  });
});

describe("isValidPhone", () => {
  it("matches PhoneSchema", () => {
    assert.equal(isValidPhone("+1 415.555.0100"), true);
    assert.equal(isValidPhone("555-0100"), false);
  });
});

describe("normalizePhone", () => {
  it("strips separators only", () => {
    assert.equal(normalizePhone("+52 442-123.45(67)"), "+524421234567");
  });
});
