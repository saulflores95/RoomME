import * as SecureStore from "expo-secure-store";
import { expoClient } from "@better-auth/expo/client";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { ac, authRoles } from "@acme/auth/permissions";

import { getBaseUrl } from "./base-url";

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    expoClient({
      scheme: "expo",
      storagePrefix: "expo",
      storage: SecureStore,
    }),
    adminClient({
      ac,
      roles: authRoles,
    }),
  ],
});
