import type { BetterAuthOptions, BetterAuthPlugin } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

import { db } from "@acme/db/client";

import { sendPasswordResetEmail, sendVerificationEmail } from "./email";
import { ac, authRoles } from "./permissions";

export function initAuth<
  TExtraPlugins extends BetterAuthPlugin[] = [],
>(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;
  trustedOrigins?: string[];
  extraPlugins?: TExtraPlugins;
}) {
  const config = {
    appName: "RooMe",
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    baseURL: options.baseUrl,
    secret: options.secret,
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url }): Promise<void> => {
        await sendPasswordResetEmail({
          to: user.email,
          name: user.name,
          url,
        });
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }): Promise<void> => {
        await sendVerificationEmail({
          to: user.email,
          name: user.name,
          url,
        });
      },
    },
    user: {
      additionalFields: {
        bio: {
          type: "string",
          required: false,
        },
        birthDate: {
          type: "date",
          required: false,
        },
        hobbies: {
          type: "string[]",
          required: false,
        },
        personalities: {
          type: "string[]",
          required: false,
        },
        hasPets: {
          type: "boolean",
          required: false,
        },
        petType: {
          type: "string",
          required: false,
        },
        petSize: {
          type: "string",
          required: false,
        },
        operatingCities: {
          type: "string[]",
          required: false,
        },
        agentApproved: {
          type: "boolean",
          required: false,
          defaultValue: false,
        },
      },
    },
    plugins: [
      expo(),
      admin({
        ac,
        roles: authRoles,
        defaultRole: "roomie",
        adminRoles: ["admin"],
      }),
      ...(options.extraPlugins ?? []),
    ],
    trustedOrigins: [
      ...new Set([
        options.baseUrl,
        options.productionUrl,
        "https://roomemx.vercel.app",
        ...(options.trustedOrigins ?? []),
        "expo://",
        "exp://",
      ]),
    ],
    onAPIError: {
      onError(error, ctx) {
        console.error("BETTER AUTH API ERROR", error, ctx);
      },
    },
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
