"use client";

import type { JSX } from "react";
import { useState } from "react";
import { notFound } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import { TooltipProvider } from "@acme/ui/tooltip";

import type { ListingDetailData } from "~/components/listing-detail/detail-types";
import type { MapPin } from "~/components/listing-detail/property-section";
import { authClient } from "~/auth/client";
import { ApplyPanel } from "~/components/listing-detail/apply-panel";
import { ContactWhatsAppButton } from "~/components/listing-detail/contact-whatsapp-button";
import { DetailMap } from "~/components/listing-detail/detail-map";
import {
  ActionTooltip,
  Pill,
} from "~/components/listing-detail/detail-primitives";
import { HostApplicants } from "~/components/listing-detail/host-applicants";
import { ListingGallery } from "~/components/listing-detail/listing-gallery";
import { ListingHeader } from "~/components/listing-detail/listing-header";
import { PropertyFacts } from "~/components/listing-detail/property-facts";
import { PropertySection } from "~/components/listing-detail/property-section";
import { RoomFacts } from "~/components/listing-detail/room-facts";
import { useGalleryImages } from "~/components/listing-detail/use-gallery-images";
import { useListingLabels } from "~/components/listing-detail/use-listing-labels";
import { RoomShareButton } from "~/components/room-share-button";
import { ScheduleTourButton } from "~/components/schedule-tour-button";
import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

const listingMapPin = (listing: ListingDetailData): MapPin | null =>
  listing.city === "queretaro" &&
  listing.latitude !== null &&
  listing.longitude !== null
    ? {
        city: listing.city,
        latitude: listing.latitude,
        longitude: listing.longitude,
      }
    : null;

export function RoomDetail({ id }: { id: string }): JSX.Element {
  const trpc = useTRPC();
  const { data: listing } = useSuspenseQuery(
    trpc.listing.byId.queryOptions({ id }),
  );

  if (!listing) {
    notFound();
  }

  return <ListingDetailView listing={listing} />;
}

const ListingDetailView = ({
  listing,
}: {
  listing: ListingDetailData;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const { data: session } = authClient.useSession();
  const labels = useListingLabels(listing);
  const galleryImages = useGalleryImages(listing);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isSignedIn = session?.user != null;
  const isHost = isSignedIn && listing.host?.id === session.user.id;
  const canTour = listing.city === "queretaro" && listing.host !== null;
  const hostPhone = isHost ? null : (listing.host?.phone ?? null);
  const isEntire = listing.listingType === "entire_property";
  const { property } = listing;
  const mapPin = listingMapPin(listing);
  const backHref =
    listing.city === "queretaro" ? "/rooms-for-rent-queretaro" : "/rooms";
  const showPropertySection =
    property !== null && (!isEntire || property.isSharedBuilding);

  const selectPropertyImage = (imageId: string): void => {
    const index = galleryImages.findIndex(
      (item) => item.source === "property" && item.id === imageId,
    );
    if (index >= 0) {
      setActiveImageIndex(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={backHref}
          className="text-muted-foreground hover:text-foreground text-sm font-medium underline-offset-4 hover:underline"
        >
          {t("backToResults")}
        </Link>
        <TooltipProvider>
          <div className="flex flex-wrap items-center gap-2">
            <ActionTooltip label={t("shareTooltip")}>
              <RoomShareButton
                listingId={listing.id}
                title={listing.title}
                description={listing.description}
              />
            </ActionTooltip>
            {canTour && !isHost ? (
              isSignedIn ? (
                <ActionTooltip label={t("scheduleTourTooltip")}>
                  <ScheduleTourButton roomId={listing.id} />
                </ActionTooltip>
              ) : (
                <ActionTooltip label={t("scheduleTourSignInTooltip")}>
                  <Button asChild>
                    <Link href="/sign-in">{t("scheduleTour")}</Link>
                  </Button>
                </ActionTooltip>
              )
            ) : null}
            {hostPhone ? (
              <ActionTooltip label={t("contactWhatsAppTooltip")}>
                <ContactWhatsAppButton
                  listingId={listing.id}
                  title={listing.title}
                  phone={hostPhone}
                />
              </ActionTooltip>
            ) : null}
            {isHost ? (
              <Button asChild variant="outline">
                <Link href={`/host/rooms/${listing.id}/edit`}>
                  {t("editListing")}
                </Link>
              </Button>
            ) : null}
          </div>
        </TooltipProvider>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <ListingGallery
          images={galleryImages}
          title={listing.title}
          listingType={listing.listingType}
          activeIndex={activeImageIndex}
          onSelect={setActiveImageIndex}
        />

        <div className="space-y-5">
          <ListingHeader listing={listing} labels={labels} />
          {listing.host && !isHost ? (
            <ApplyPanel listing={listing} isSignedIn={isSignedIn} />
          ) : null}
          {isEntire ? (
            <PropertyFacts listing={listing} labels={labels} />
          ) : (
            <RoomFacts listing={listing} labels={labels} />
          )}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("about")}</h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed whitespace-pre-wrap">
          {listing.description}
        </p>
      </section>

      {isHost ? <HostApplicants listingId={listing.id} /> : null}

      {isEntire && property && property.amenities.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">{t("amenities")}</h2>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => (
              <Pill key={amenity}>{amenity}</Pill>
            ))}
          </div>
        </section>
      ) : null}

      {listing.includes.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">{t("includes")}</h2>
          <div className="flex flex-wrap gap-2">
            {listing.includes.map((item) => (
              <Pill key={item}>{labels.include(item)}</Pill>
            ))}
          </div>
        </section>
      ) : null}

      {mapPin ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">{t("location")}</h2>
          <div className="border-border h-72 overflow-hidden rounded-2xl border sm:h-96">
            <DetailMap
              city={mapPin.city}
              latitude={mapPin.latitude}
              longitude={mapPin.longitude}
            />
          </div>
        </section>
      ) : null}

      {showPropertySection ? (
        <PropertySection
          property={property}
          labels={labels}
          listingPin={mapPin}
          onSelectImage={selectPropertyImage}
        />
      ) : null}
    </div>
  );
};
