"use client";

import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { ListingForm } from "~/components/listing-form";
import { roomToListingFormValues } from "~/components/listing/form-values";
import { useTRPC } from "~/trpc/react";

export function EditListingForm({ roomId }: { roomId: string }): JSX.Element {
  const t = useTranslations("list");
  const trpc = useTRPC();
  const query = useQuery(trpc.listing.roomForEdit.queryOptions({ id: roomId }));

  if (query.isPending) {
    return <p className="text-muted-foreground">{t("loading")}</p>;
  }

  if (!query.data) {
    return <p className="text-muted-foreground">{t("notFound")}</p>;
  }

  return (
    <ListingForm
      roomId={roomId}
      defaultValues={roomToListingFormValues(query.data)}
    />
  );
}
