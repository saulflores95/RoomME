"use client";

import type { JSX } from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import type { RouterOutputs } from "@acme/api";
import type { ListingFormValues } from "@acme/validators";
import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";
import {
  isValidPhone,
  ListingFormSchema,
  normalizePhone,
} from "@acme/validators";

import type { ListingStepKey } from "~/components/listing/use-listing-steps";
import { ContactPhoneFields } from "~/components/listing/contact-phone-fields";
import { DetailsFields } from "~/components/listing/details-fields";
import {
  listingFormDefaults,
  toCreateListingInput,
} from "~/components/listing/form-values";
import { HouseholdFields } from "~/components/listing/household-fields";
import { LayoutFields } from "~/components/listing/layout-fields";
import { ListingTypeFields } from "~/components/listing/listing-type-fields";
import { LocationFields } from "~/components/listing/location-fields";
import { MoneyFields } from "~/components/listing/money-fields";
import { OperationTypeFields } from "~/components/listing/operation-type-fields";
import { RulesFields } from "~/components/listing/rules-fields";
import { useListingSteps } from "~/components/listing/use-listing-steps";
import { useRouter } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

const emptyProperties: RouterOutputs["listing"]["properties"] = [];

export function ListingForm({
  roomId,
  defaultValues,
  initialListingType = "room",
}: {
  roomId?: string;
  defaultValues?: ListingFormValues;
  initialListingType?: ListingFormValues["listingType"];
}): JSX.Element {
  const t = useTranslations("list");
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = roomId !== undefined;

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(ListingFormSchema),
    defaultValues: defaultValues ?? listingFormDefaults(initialListingType),
  });
  const listingType = useWatch({ control: form.control, name: "listingType" });
  const steps = useListingSteps(listingType);

  const propertiesQuery = useQuery(trpc.listing.properties.queryOptions());
  const properties = propertiesQuery.data ?? emptyProperties;

  const meQuery = useQuery({
    ...trpc.profile.me.queryOptions(),
    enabled: !isEdit,
  });
  const needsPhone = !isEdit && meQuery.data != null && !meQuery.data.phone;
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const savePhone = useMutation(trpc.profile.update.mutationOptions());

  const invalidate = async (): Promise<void> => {
    await queryClient.invalidateQueries(trpc.listing.list.queryFilter());
    await queryClient.invalidateQueries(trpc.listing.mine.queryFilter());
    await queryClient.invalidateQueries(trpc.listing.properties.queryFilter());
  };

  const create = useMutation(
    trpc.listing.create.mutationOptions({
      onSuccess: async (result) => {
        toast.success(t("success"));
        await invalidate();
        router.push(`/rooms/${result.roomId}`);
      },
      onError: (error) => {
        toast.error(
          error.data?.code === "PRECONDITION_FAILED"
            ? t("contactPhoneRequired")
            : error.message,
        );
      },
    }),
  );

  const update = useMutation(
    trpc.listing.update.mutationOptions({
      onSuccess: async () => {
        toast.success(t("saved"));
        await invalidate();
        router.push("/host");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const onSubmit = async (values: ListingFormValues): Promise<void> => {
    const input = toCreateListingInput(values);
    if (isEdit) {
      update.mutate({ id: roomId, ...input });
      return;
    }
    if (needsPhone) {
      if (!isValidPhone(phone)) {
        setPhoneError(t("contactPhoneInvalid"));
        return;
      }
      try {
        await savePhone.mutateAsync({ phone: normalizePhone(phone.trim()) });
        await queryClient.invalidateQueries(trpc.profile.me.queryFilter());
      } catch {
        toast.error(t("contactPhoneSaveFailed"));
        return;
      }
    }
    create.mutate(input);
  };

  const renderStep = (key: ListingStepKey): JSX.Element => {
    const step = steps.stepOf(key);
    switch (key) {
      case "type":
        return <ListingTypeFields key={key} step={step} locked={isEdit} />;
      case "operation":
        return <OperationTypeFields key={key} step={step} />;
      case "details":
        return <DetailsFields key={key} step={step} />;
      case "layout":
        return <LayoutFields key={key} step={step} />;
      case "money":
        return <MoneyFields key={key} step={step} />;
      case "household":
        return <HouseholdFields key={key} step={step} />;
      case "rules":
        return <RulesFields key={key} step={step} />;
      case "location":
        return <LocationFields key={key} step={step} properties={properties} />;
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="mx-auto max-w-2xl space-y-6"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {steps.keys.map(renderStep)}

        {needsPhone ? (
          <ContactPhoneFields
            step={steps.keys.length + 1}
            phone={phone}
            error={phoneError}
            onPhoneChange={(value) => {
              setPhone(value);
              setPhoneError(null);
            }}
          />
        ) : null}

        <Button
          type="submit"
          disabled={create.isPending || update.isPending || savePhone.isPending}
        >
          {isEdit ? t("save") : t("submit")}
        </Button>
      </form>
    </FormProvider>
  );
}
