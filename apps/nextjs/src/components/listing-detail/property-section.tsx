"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { City } from "@acme/validators";

import type { ListingDetailProperty } from "./detail-types";
import type { ListingLabels } from "./use-listing-labels";
import { DetailMap } from "./detail-map";
import { Fact, Pill } from "./detail-primitives";

export interface MapPin {
  city: City;
  latitude: number;
  longitude: number;
}

export const PropertySection = ({
  property,
  labels,
  listingPin,
  onSelectImage,
}: {
  property: ListingDetailProperty;
  labels: ListingLabels;
  listingPin: MapPin | null;
  onSelectImage: (imageId: string) => void;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const propertyPin: MapPin | null =
    property.latitude != null && property.longitude != null
      ? {
          city: property.city,
          latitude: property.latitude,
          longitude: property.longitude,
        }
      : null;
  const showMap =
    propertyPin !== null &&
    (listingPin === null ||
      listingPin.latitude !== propertyPin.latitude ||
      listingPin.longitude !== propertyPin.longitude);

  return (
    <section id="property" className="border-border space-y-6 border-t pt-10">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          {property.isSharedBuilding
            ? t("complexSection")
            : labels.propertyType(property.propertyType)}
        </p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {property.title}
        </h2>
        <p className="text-muted-foreground">
          {[
            property.addressLine1,
            property.neighborhood,
            labels.city(property.city),
          ].join(", ")}
        </p>
      </div>

      {property.description.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {property.isSharedBuilding ? t("aboutComplex") : t("aboutProperty")}
          </h3>
          <p className="text-muted-foreground max-w-3xl leading-relaxed whitespace-pre-wrap">
            {property.description}
          </p>
        </div>
      ) : null}

      <dl className="grid max-w-md grid-cols-2 gap-2">
        {property.bedroomCount != null ? (
          <Fact
            label={t("bedrooms")}
            value={t("bedroomsCount", { count: property.bedroomCount })}
          />
        ) : null}
        {property.bathroomCount != null ? (
          <Fact
            label={t("bathrooms")}
            value={t("bathroomsCount", { count: property.bathroomCount })}
          />
        ) : null}
        <Fact label={t("pets")} value={labels.yesNo(property.petFriendly)} />
        <Fact
          label={t("complexPhotos")}
          value={String(property.images.length)}
        />
      </dl>

      {property.amenities.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{t("amenities")}</h3>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => (
              <Pill key={amenity}>{amenity}</Pill>
            ))}
          </div>
        </div>
      ) : null}

      {property.images.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{t("complexGallery")}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {property.images.map((image) => (
              <button
                key={image.id}
                type="button"
                className="bg-muted aspect-4/3 overflow-hidden rounded-2xl text-left"
                onClick={() => {
                  onSelectImage(image.id);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.alt ?? property.title}
                  className="h-full w-full object-cover transition-transform hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {showMap ? (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{t("complexLocation")}</h3>
          <div className="border-border h-64 overflow-hidden rounded-2xl border sm:h-80">
            <DetailMap
              city={propertyPin.city}
              latitude={propertyPin.latitude}
              longitude={propertyPin.longitude}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
};
