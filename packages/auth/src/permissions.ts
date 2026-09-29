import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const statement = {
  ...defaultStatements,
  property: ["create", "update", "delete", "list"],
  room: ["create", "update", "delete", "list"],
  rating: ["create", "list"],
} as const;

export const ac = createAccessControl(statement);

/** Every signed-in user can publish and book; ownership is enforced per row. */
export const roomie = ac.newRole({
  property: ["create", "update", "delete", "list"],
  room: ["create", "update", "delete", "list"],
  rating: ["create", "list"],
});

export const host = ac.newRole({
  property: ["create", "update", "delete", "list"],
  room: ["create", "update", "delete", "list"],
  rating: ["create", "list"],
});

export const agent = ac.newRole({
  property: ["create", "update", "list"],
  room: ["create", "update", "list"],
  rating: ["list"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
  property: ["create", "update", "delete", "list"],
  room: ["create", "update", "delete", "list"],
  rating: ["create", "list"],
});

export const authRoles = { roomie, host, agent, admin } as const;
