import { hasRole, isAgentOrAdmin } from "@acme/auth/roles";

export interface AccessActor {
  id: string;
  role?: string | null;
}

export interface OwnedProperty {
  ownerId: string | null;
}

/** Ownerless properties are legacy, platform-managed shared buildings. */
export const isSharedBuilding = (property: OwnedProperty): boolean =>
  property.ownerId === null;

export const canManageProperty = (
  actor: AccessActor,
  property: OwnedProperty,
): boolean => {
  if (hasRole(actor.role, "admin")) {
    return true;
  }
  if (isSharedBuilding(property)) {
    return isAgentOrAdmin(actor.role);
  }
  return property.ownerId === actor.id;
};

export const canAttachListing = (
  actor: AccessActor,
  property: OwnedProperty,
): boolean =>
  hasRole(actor.role, "admin") ||
  isSharedBuilding(property) ||
  property.ownerId === actor.id;

export const canManageListing = (
  actor: AccessActor,
  listing: { hostId: string | null },
): boolean =>
  hasRole(actor.role, "admin") ||
  (listing.hostId !== null && listing.hostId === actor.id);
