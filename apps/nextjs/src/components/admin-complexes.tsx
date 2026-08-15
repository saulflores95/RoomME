"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import { AdminConfirmDialog } from "~/components/admin-confirm-dialog";
import { useTRPC } from "~/trpc/react";

export function AdminComplexes(): JSX.Element {
  const t = useTranslations("admin");
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const complexesQuery = useQuery(trpc.admin.complexes.queryOptions());
  const [removeId, setRemoveId] = useState<string | null>(null);

  const deleteMutation = useMutation(
    trpc.admin.deleteComplex.mutationOptions({
      onSuccess: async () => {
        toast.success(t("complexRemoved"));
        setRemoveId(null);
        await Promise.all([
          queryClient.invalidateQueries(trpc.admin.complexes.queryFilter()),
          queryClient.invalidateQueries(trpc.admin.rooms.queryFilter()),
        ]);
      },
      onError: () => toast.error(t("removeFailed")),
    }),
  );

  if (complexesQuery.isPending) {
    return <div className="bg-muted h-64 animate-pulse rounded-2xl" />;
  }

  const complexes = complexesQuery.data ?? [];
  const removeTarget = complexes.find((row) => row.id === removeId) ?? null;

  return (
    <section className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
      {complexes.length === 0 ? (
        <p className="text-muted-foreground px-5 py-8 text-sm">
          {t("emptyComplexes")}
        </p>
      ) : (
        <ul className="divide-border divide-y">
          {complexes.map((row) => (
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
                  {t("roomCount", { count: row.roomCount })}
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
        title={t("removeComplexTitle")}
        description={t("removeComplexHint", {
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
