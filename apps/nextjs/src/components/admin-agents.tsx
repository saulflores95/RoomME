"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { canCreateListing, hasRole } from "@acme/auth/roles";
import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import { AdminConfirmDialog } from "~/components/admin-confirm-dialog";
import { useTRPC } from "~/trpc/react";

export function AdminAgents(): JSX.Element {
  const t = useTranslations("admin");
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const usersQuery = useQuery(trpc.admin.users.queryOptions());
  const [removeUserId, setRemoveUserId] = useState<string | null>(null);

  const approvalMutation = useMutation(
    trpc.admin.setAgentApproval.mutationOptions({
      onSuccess: async () => {
        toast.success(t("saved"));
        await queryClient.invalidateQueries(trpc.admin.users.queryFilter());
      },
      onError: () => toast.error(t("saveFailed")),
    }),
  );

  const removeMutation = useMutation(
    trpc.admin.removeAgent.mutationOptions({
      onSuccess: async () => {
        toast.success(t("agentRemoved"));
        setRemoveUserId(null);
        await queryClient.invalidateQueries(trpc.admin.users.queryFilter());
      },
      onError: () => toast.error(t("removeFailed")),
    }),
  );

  if (usersQuery.isPending) {
    return <div className="bg-muted h-64 animate-pulse rounded-2xl" />;
  }

  const users = usersQuery.data ?? [];
  const removeTarget = users.find((row) => row.id === removeUserId) ?? null;

  return (
    <section className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
      {users.length === 0 ? (
        <p className="text-muted-foreground px-5 py-8 text-sm">{t("empty")}</p>
      ) : (
        <ul className="divide-border divide-y">
          {users.map((row) => {
            const approved = canCreateListing(row.role, row.agentApproved);
            const isAgent = hasRole(row.role, "agent") || row.agentApproved;
            const isAdmin = hasRole(row.role, "admin");
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
                <div className="flex flex-wrap gap-2">
                  {!approved && !isAdmin ? (
                    <Button
                      type="button"
                      size="sm"
                      disabled={approvalMutation.isPending}
                      onClick={() =>
                        approvalMutation.mutate({
                          userId: row.id,
                          approved: true,
                        })
                      }
                    >
                      {t("approve")}
                    </Button>
                  ) : null}
                  {isAgent && !isAdmin ? (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={removeMutation.isPending}
                      onClick={() => setRemoveUserId(row.id)}
                    >
                      {t("remove")}
                    </Button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <AdminConfirmDialog
        open={removeTarget != null}
        title={t("removeAgentTitle")}
        description={t("removeAgentHint", {
          name: removeTarget?.name ?? "",
        })}
        pending={removeMutation.isPending}
        onClose={() => setRemoveUserId(null)}
        onConfirm={() => {
          if (!removeTarget) return;
          removeMutation.mutate({ userId: removeTarget.id });
        }}
      />
    </section>
  );
}
