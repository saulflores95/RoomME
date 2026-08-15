import { cache } from "react";

import { canCreateListing, hasRole } from "@acme/auth/roles";
import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import { user } from "@acme/db/schema";

import { getSession } from "~/auth/server";

export const getListingAccess = cache(
  async (): Promise<{
    canCreateListing: boolean;
    isAdmin: boolean;
  }> => {
    const session = await getSession();
    if (!session?.user) {
      return { canCreateListing: false, isAdmin: false };
    }

    const row = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
      columns: { role: true, agentApproved: true },
    });

    return {
      canCreateListing: canCreateListing(row?.role, row?.agentApproved),
      isAdmin: hasRole(row?.role ?? session.user.role, "admin"),
    };
  },
);
