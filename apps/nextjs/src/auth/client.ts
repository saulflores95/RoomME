"use client";

import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { ac, authRoles } from "@acme/auth/permissions";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: authRoles,
    }),
  ],
});
