"use client";

import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { ComplexForm } from "~/components/complex-form";
import { complexToFormValues } from "~/components/listing/form-values";
import { useTRPC } from "~/trpc/react";

export function EditComplexForm({
  complexId,
}: {
  complexId: string;
}): JSX.Element {
  const t = useTranslations("list");
  const trpc = useTRPC();
  const query = useQuery(
    trpc.listing.complexForEdit.queryOptions({ id: complexId }),
  );

  if (query.isPending) {
    return <p className="text-muted-foreground">{t("loading")}</p>;
  }

  if (!query.data) {
    return <p className="text-muted-foreground">{t("notFound")}</p>;
  }

  return (
    <ComplexForm
      complexId={complexId}
      defaultValues={complexToFormValues(query.data)}
    />
  );
}
