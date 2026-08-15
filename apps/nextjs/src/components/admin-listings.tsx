"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import { AdminConfirmDialog } from "~/components/admin-confirm-dialog";
import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

const statusKey = (
  status: "draft" | "listed" | "occupied" | "unlisted",
): "statusDraft" | "statusListed" | "statusOccupied" | "statusUnlisted" => {
  if (status === "draft") return "statusDraft";
  if (status === "occupied") return "statusOccupied";
  if (status === "unlisted") return "statusUnlisted";
  return "statusListed";
};

export function AdminListings(): JSX.Element {
  const t = useTranslations("admin");
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const roomsQuery = useQuery(trpc.admin.rooms.queryOptions());
  const [removeId, setRemoveId] = useState<string | null>(null);

  const deleteMutation = useMutation(
    trpc.admin.deleteRoom.mutationOptions({
      onSuccess: async () => {
        toast.success(t("listingRemoved"));
        setRemoveId(null);
        await queryClient.invalidateQueries(trpc.admin.rooms.queryFilter());
      },
      onError: () => toast.error(t("removeFailed")),
    }),
  );

  if (roomsQuery.isPending) {
    return <div className="bg-muted h-64 animate-pulse rounded-2xl" />;
  }

  const rooms = roomsQuery.data ?? [];
  const removeTarget = rooms.find((row) => row.id === removeId) ?? null;

  return (
    <section className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
      {rooms.length === 0 ? (
        <p className="text-muted-foreground px-5 py-8 text-sm">
          {t("emptyListings")}
        </p>
      ) : (
        <ul className="divide-border divide-y">
          {rooms.map((row) => (
            <li
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6"
            >
              <div className="min-w-0">
                <Link
                  href={`/rooms/${row.id}`}
                  className="font-medium underline-offset-4 hover:underline"
                >
                  {row.title}
                </Link>
                <p className="text-muted-foreground truncate text-sm">
                  {[row.neighborhood, row.city].filter(Boolean).join(" · ")}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {row.hostName ?? row.hostEmail ?? t("unknownHost")}
                  {" · "}
                  {t(statusKey(row.status))}
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
        title={t("removeListingTitle")}
        description={t("removeListingHint", {
          title: removeTarget?.title ?? "",
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
