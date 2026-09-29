"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { ListingType } from "@acme/validators";
import { cn } from "@acme/ui";

import type { GalleryImage } from "./use-gallery-images";

export const ListingGallery = ({
  images,
  title,
  listingType,
  activeIndex,
  onSelect,
}: {
  images: GalleryImage[];
  title: string;
  listingType: ListingType;
  activeIndex: number;
  onSelect: (index: number) => void;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const activeImage = images[activeIndex] ?? images[0] ?? null;
  const isEntire = listingType === "entire_property";
  const sourceLabel = (image: GalleryImage, short: boolean): string => {
    if (image.source === "property" || isEntire) {
      return short ? t("photoApartmentShort") : t("photoApartment");
    }
    return short ? t("photoRoomShort") : t("photoRoom");
  };

  return (
    <div className="space-y-3">
      <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-2xl">
        {activeImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage.url}
              alt={activeImage.alt ?? title}
              className="h-full w-full object-cover"
            />
            <span className="absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
              {sourceLabel(activeImage, false)}
            </span>
          </>
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
            {t("noPhotos")}
          </div>
        )}
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={`${image.source}-${image.id}`}
              type="button"
              className={cn(
                "bg-muted relative size-16 shrink-0 overflow-hidden rounded-lg border-2",
                index === activeIndex
                  ? "border-foreground"
                  : "border-transparent opacity-80 hover:opacity-100",
              )}
              onClick={() => {
                onSelect(index);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alt ?? title}
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 bg-black/55 py-0.5 text-center text-[10px] font-medium text-white">
                {sourceLabel(image, true)}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
