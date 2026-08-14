import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const statement = {
  ...defaultStatements,
  complex: ["create", "update", "delete", "list"],
  room: ["create", "update", "delete", "list"],
  rating: ["create", "list"],
} as const;

export const ac = createAccessControl(statement);

export const roomie = ac.newRole({
  rating: ["create", "list"],
});

export const host = ac.newRole({
  complex: ["create", "update", "delete", "list"],
  room: ["create", "update", "delete", "list"],
  rating: ["create", "list"],
});

export const agent = ac.newRole({
  complex: ["create", "update", "list"],
  room: ["create", "update", "list"],
  rating: ["list"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
  complex: ["create", "update", "delete", "list"],
  room: ["create", "update", "delete", "list"],
  rating: ["create", "list"],
});

export const authRoles = { roomie, host, agent, admin } as const;
