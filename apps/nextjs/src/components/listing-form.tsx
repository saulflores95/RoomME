"use client";

import type { JSX } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";

import type { RouterOutputs } from "@acme/api";
import type { ListingFormValues } from "@acme/validators";
import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";
import { ListingFormSchema } from "@acme/validators";

import { BedroomFields } from "~/components/listing/bedroom-fields";
import {
  listingFormDefaults,
  toCreateListingInput,
} from "~/components/listing/form-values";
import { HouseholdFields } from "~/components/listing/household-fields";
import { LocationFields } from "~/components/listing/location-fields";
import { MoneyFields } from "~/components/listing/money-fields";
import { RulesFields } from "~/components/listing/rules-fields";
import { useRouter } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

const emptyComplexes: RouterOutputs["listing"]["complexes"] = [];

export function ListingForm({
  roomId,
  defaultValues,
}: {
  roomId?: string;
  defaultValues?: ListingFormValues;
}): JSX.Element {
  const t = useTranslations("list");
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = roomId !== undefined;

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(ListingFormSchema),
    defaultValues: defaultValues ?? listingFormDefaults(),
  });

  const complexesQuery = useQuery(trpc.listing.complexes.queryOptions());
  const complexes = complexesQuery.data ?? emptyComplexes;

  const create = useMutation(
    trpc.listing.create.mutationOptions({
      onSuccess: async () => {
        toast.success(t("success"));
        await queryClient.invalidateQueries(trpc.listing.list.queryFilter());
        router.push("/rooms");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const update = useMutation(
    trpc.listing.update.mutationOptions({
      onSuccess: async () => {
        toast.success(t("saved"));
        await queryClient.invalidateQueries(trpc.listing.list.queryFilter());
        await queryClient.invalidateQueries(trpc.listing.mine.queryFilter());
        router.push("/host");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const onSubmit = (values: ListingFormValues): void => {
    const input = toCreateListingInput(values);
    if (isEdit) {
      update.mutate({ id: roomId, ...input });
      return;
    }
    create.mutate(input);
  };

  return (
    <FormProvider {...form}>
      <form
        className="mx-auto max-w-2xl space-y-6"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <BedroomFields />
        <MoneyFields />
        <HouseholdFields />
        <RulesFields />
        <LocationFields complexes={complexes} />

        <Button type="submit" disabled={create.isPending || update.isPending}>
          {isEdit ? t("save") : t("submit")}
        </Button>
      </form>
    </FormProvider>
  );
}
