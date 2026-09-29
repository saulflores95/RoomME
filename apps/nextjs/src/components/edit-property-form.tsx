"use client";

import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { propertyToFormValues } from "~/components/listing/form-values";
import { PropertyForm } from "~/components/property-form";
import { useTRPC } from "~/trpc/react";

export function EditPropertyForm({
  propertyId,
}: {
  propertyId: string;
}): JSX.Element {
  const t = useTranslations("list");
  const trpc = useTRPC();
  const query = useQuery(
    trpc.listing.propertyForEdit.queryOptions({ id: propertyId }),
  );

  if (query.isPending) {
    return <p className="text-muted-foreground">{t("loading")}</p>;
  }

  if (!query.data) {
    return <p className="text-muted-foreground">{t("notFound")}</p>;
  }

  return (
    <PropertyForm
      propertyId={propertyId}
      defaultValues={propertyToFormValues(query.data)}
    />
  );
}
