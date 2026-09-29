import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  canAttachListing,
  canManageListing,
  canManageProperty,
  isSharedBuilding,
} from "./property-access";

const owner = { id: "owner", role: "roomie" };
const stranger = { id: "stranger", role: "roomie,host" };
const agent = { id: "agent", role: "agent" };
const admin = { id: "admin", role: "admin" };

const ownedProperty = { ownerId: "owner" };
const sharedBuilding = { ownerId: null };

describe("property access", () => {
  it("treats ownerless properties as shared buildings", () => {
    assert.equal(isSharedBuilding(sharedBuilding), true);
    assert.equal(isSharedBuilding(ownedProperty), false);
  });

  it("lets owners and admins manage an owned property", () => {
    assert.equal(canManageProperty(owner, ownedProperty), true);
    assert.equal(canManageProperty(admin, ownedProperty), true);
  });

  it("blocks non-owners, including agents, from an owned property", () => {
    assert.equal(canManageProperty(stranger, ownedProperty), false);
    assert.equal(canManageProperty(agent, ownedProperty), false);
  });

  it("lets only agents and admins manage shared buildings", () => {
    assert.equal(canManageProperty(agent, sharedBuilding), true);
    assert.equal(canManageProperty(admin, sharedBuilding), true);
    assert.equal(canManageProperty(owner, sharedBuilding), false);
  });

  it("lets anyone attach a listing to a shared building", () => {
    assert.equal(canAttachListing(stranger, sharedBuilding), true);
  });

  it("only lets the owner or an admin attach listings to an owned property", () => {
    assert.equal(canAttachListing(owner, ownedProperty), true);
    assert.equal(canAttachListing(admin, ownedProperty), true);
    assert.equal(canAttachListing(stranger, ownedProperty), false);
    assert.equal(canAttachListing(agent, ownedProperty), false);
  });

  it("lets hosts and admins manage listings", () => {
    assert.equal(canManageListing(owner, { hostId: "owner" }), true);
    assert.equal(canManageListing(admin, { hostId: "owner" }), true);
    assert.equal(canManageListing(stranger, { hostId: "owner" }), false);
    assert.equal(canManageListing(stranger, { hostId: null }), false);
  });
});
