"use client";

import type { JSX } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { canCreateListing } from "@acme/auth/roles";
import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import { useTRPC } from "~/trpc/react";

export function AdminAgents(): JSX.Element {
  const t = useTranslations("admin");
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const usersQuery = useQuery(trpc.admin.users.queryOptions());

  const approvalMutation = useMutation(
    trpc.admin.setAgentApproval.mutationOptions({
      onSuccess: async () => {
        toast.success(t("saved"));
        await queryClient.invalidateQueries(trpc.admin.users.queryFilter());
      },
      onError: () => toast.error(t("saveFailed")),
    }),
  );

  if (usersQuery.isPending) {
    return <div className="bg-muted h-64 animate-pulse rounded-2xl" />;
  }

  const users = usersQuery.data ?? [];

  return (
    <section className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
      <ul className="divide-border divide-y">
        {users.map((row) => {
          const approved = canCreateListing(row.role, row.agentApproved);
          return (
            <li
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6"
            >
              <div className="min-w-0">
                <p className="font-medium">{row.name}</p>
                <p className="text-muted-foreground truncate text-sm">
                  {row.email}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {row.role ?? "roomie"}
                  {" · "}
                  {approved ? t("approved") : t("notApproved")}
                </p>
              </div>
              <Button
                type="button"
                variant={row.agentApproved ? "outline" : "default"}
                size="sm"
                disabled={approvalMutation.isPending}
                onClick={() =>
                  approvalMutation.mutate({
                    userId: row.id,
                    approved: !row.agentApproved,
                  })
                }
              >
                {row.agentApproved ? t("revoke") : t("approve")}
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
