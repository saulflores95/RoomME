"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import type { ListListingsInput } from "@acme/validators";
import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";

import {
  countActiveFilters,
  FilterDivider,
} from "~/components/rooms-filter-controls";
import {
  RoomOnlySections,
  SharedSections,
} from "~/components/rooms-filters/choice-sections";
import {
  AgeSection,
  RentSection,
} from "~/components/rooms-filters/range-sections";
import {
  ListingTypeSection,
  PropertyTypeSection,
} from "~/components/rooms-filters/type-sections";
import { useFilterDraft } from "~/components/rooms-filters/use-filter-draft";

const emptyFilters: ListListingsInput = {};

export function RoomsFilters({
  value,
  onChange,
}: {
  value: ListListingsInput;
  onChange: (next: ListListingsInput) => void;
}): JSX.Element {
  const t = useTranslations("rooms");
  const [open, setOpen] = useState(false);
  const filters = useFilterDraft(value);
  const { draft, setDraft } = filters;
  const activeCount = useMemo(() => countActiveFilters(value), [value]);
  const showRoomFilters = draft.listingType !== "entire_property";

  const handleOpenChange = (nextOpen: boolean): void => {
    if (nextOpen) {
      setDraft(value);
    }
    setOpen(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="gap-2">
          {t("filters")}
          {activeCount > 0 ? (
            <span className="bg-primary text-primary-foreground inline-flex size-5 items-center justify-center rounded-full text-xs font-semibold">
              {activeCount}
            </span>
          ) : null}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="flex max-h-[min(90vh,720px)] flex-col gap-0 p-0 sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>{t("filters")}</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto px-5">
          <ListingTypeSection filters={filters} />
          <FilterDivider />
          <PropertyTypeSection filters={filters} />
          <FilterDivider />
          <RentSection filters={filters} />
          <FilterDivider />
          {showRoomFilters ? (
            <>
              <AgeSection filters={filters} />
              <FilterDivider />
              <RoomOnlySections filters={filters} />
              <FilterDivider />
            </>
          ) : null}
          <SharedSections filters={filters} />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setDraft(emptyFilters);
            }}
          >
            {t("clear")}
          </Button>
          <Button
            type="button"
            onClick={() => {
              onChange(draft);
              setOpen(false);
            }}
          >
            {t("showResults")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
