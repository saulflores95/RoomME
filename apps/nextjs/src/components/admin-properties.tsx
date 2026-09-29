"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import { AdminConfirmDialog } from "~/components/admin-confirm-dialog";
import { useTRPC } from "~/trpc/react";

export function AdminProperties(): JSX.Element {
  const t = useTranslations("admin");
  const tList = useTranslations("list");
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const propertiesQuery = useQuery(trpc.admin.properties.queryOptions());
  const [removeId, setRemoveId] = useState<string | null>(null);

  const deleteMutation = useMutation(
    trpc.admin.deleteProperty.mutationOptions({
      onSuccess: async () => {
        toast.success(t("propertyRemoved"));
        setRemoveId(null);
        await Promise.all([
          queryClient.invalidateQueries(trpc.admin.properties.queryFilter()),
          queryClient.invalidateQueries(trpc.admin.rooms.queryFilter()),
        ]);
      },
      onError: () => toast.error(t("removeFailed")),
    }),
  );

  if (propertiesQuery.isPending) {
    return <div className="bg-muted h-64 animate-pulse rounded-2xl" />;
  }

  const properties = propertiesQuery.data ?? [];
  const removeTarget = properties.find((row) => row.id === removeId) ?? null;

  return (
    <section className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
      {properties.length === 0 ? (
        <p className="text-muted-foreground px-5 py-8 text-sm">
          {t("emptyProperties")}
        </p>
      ) : (
        <ul className="divide-border divide-y">
          {properties.map((row) => (
            <li
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6"
            >
              <div className="min-w-0">
                <p className="font-medium">{row.title}</p>
                <p className="text-muted-foreground truncate text-sm">
                  {[row.neighborhood, row.city].filter(Boolean).join(" · ")}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {[
                    tList(`propertyTypeOption.${row.propertyType}`),
                    row.ownerName ?? t("sharedBuilding"),
                    t("roomCount", { count: row.roomCount }),
                  ].join(" · ")}
                </p>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={deleteMutation.isPending}
                onClick={() => setRemoveId(row.id)}
              >
                {t("remove")}
              </Button>
            </li>
          ))}
        </ul>
      )}

      <AdminConfirmDialog
        open={removeTarget != null}
        title={t("removePropertyTitle")}
        description={t("removePropertyHint", {
          title: removeTarget?.title ?? "",
          count: removeTarget?.roomCount ?? 0,
        })}
        pending={deleteMutation.isPending}
        onClose={() => setRemoveId(null)}
        onConfirm={() => {
          if (!removeTarget) return;
          deleteMutation.mutate({ id: removeTarget.id });
        }}
      />
    </section>
  );
}
