"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";

import { authClient } from "~/auth/client";
import { ApplicantCard } from "~/components/applicant-card";
import { formatMxn } from "~/components/room-card";
import { RoomShareButton } from "~/components/room-share-button";
import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

const RoomDetailMap = dynamic(
  async () => {
    const mod = await import("~/components/room-detail-map");
    return mod.RoomDetailMap;
  },
  {
    ssr: false,
    loading: () => <div className="bg-muted h-full w-full animate-pulse" />,
  },
);

type GallerySource = "room" | "complex";

interface GalleryImage {
  id: string;
  url: string;
  alt: string | null;
  source: GallerySource;
}

const formatAvailable = (
  value: Date | string | null,
  immediately: string,
): string => {
  if (!value) {
    return immediately;
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return immediately;
  }
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const Fact = ({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element => (
  <div className="border-border rounded-xl border px-3 py-2.5">
    <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
      {label}
    </dt>
    <dd className="mt-1 text-sm font-medium">{value}</dd>
  </div>
);

const Pill = ({ children }: { children: string }): JSX.Element => (
  <span className="border-border bg-muted/50 inline-flex items-center rounded-full border px-3 py-1 text-sm">
    {children}
  </span>
);

export function RoomDetail({ id }: { id: string }): JSX.Element {
  const t = useTranslations("rooms");
  const tProfile = useTranslations("profile");
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const { data: listing } = useSuspenseQuery(
    trpc.listing.byId.queryOptions({ id }),
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [applyError, setApplyError] = useState<string | null>(null);

  const isHost =
    session?.user.id != null && listing?.host?.id === session.user.id;
  const isSignedIn = session?.user != null;

  const myApplicationQuery = useQuery({
    ...trpc.application.mineForRoom.queryOptions({ roomId: id }),
    enabled: isSignedIn && !isHost,
  });

  const applicantsQuery = useQuery({
    ...trpc.application.listForRoom.queryOptions({ roomId: id }),
    enabled: isHost,
  });

  const applyMutation = useMutation(
    trpc.application.apply.mutationOptions({
      onSuccess: async () => {
        setApplyError(null);
        await queryClient.invalidateQueries(
          trpc.application.mineForRoom.queryFilter({ roomId: id }),
        );
        if (isHost) {
          await queryClient.invalidateQueries(
            trpc.application.listForRoom.queryFilter({ roomId: id }),
          );
        }
      },
      onError: () => {
        setApplyError(t("applyFailed"));
      },
    }),
  );

  const galleryImages = useMemo((): GalleryImage[] => {
    if (!listing) {
      return [];
    }

    const roomImages: GalleryImage[] = listing.images.map((image) => ({
      ...image,
      source: "room",
    }));
    const complexImages: GalleryImage[] =
      listing.complex?.images.map((image) => ({
        ...image,
        source: "complex",
      })) ?? [];

    if (roomImages.length > 0 || complexImages.length > 0) {
      return [...roomImages, ...complexImages];
    }

    if (listing.coverUrl) {
      return [
        {
          id: "cover",
          url: listing.coverUrl,
          alt: listing.title,
          source: "room",
        },
      ];
    }

    return [];
  }, [listing]);

  if (!listing) {
    notFound();
  }

  const activeImage =
    galleryImages[activeImageIndex] ?? galleryImages[0] ?? null;
  const complex = listing.complex;

  const locationParts = [
    listing.addressLine1,
    listing.neighborhood,
    listing.city === "cdmx"
      ? t("cdmx")
      : listing.city === "queretaro"
        ? t("queretaro")
        : null,
  ].filter((part): part is string => Boolean(part && part.length > 0));
  const locationLabel = locationParts.join(", ");

  const genderLabel =
    listing.householdGender === "male"
      ? t("genderMale")
      : listing.householdGender === "female"
        ? t("genderFemale")
        : t("genderMixed");

  const bathroomLabel =
    listing.bathroomType === "private"
      ? t("bathroomPrivate")
      : t("bathroomShared");

  const furnishedLabel =
    listing.furnished === "furnished"
      ? t("furnishedYes")
      : listing.furnished === "semi"
        ? t("furnishedSemi")
        : t("furnishedNo");

  const smokingLabel =
    listing.smokingPolicy === "no"
      ? t("smokingNo")
      : listing.smokingPolicy === "outdoor"
        ? t("smokingOutdoor")
        : t("smokingYes");

  const guestsLabel =
    listing.overnightGuests === "no"
      ? t("guestsNo")
      : listing.overnightGuests === "ask"
        ? t("guestsAsk")
        : t("guestsYes");

  const cleanlinessLabel =
    listing.cleanliness === "relaxed"
      ? t("cleanlinessRelaxed")
      : listing.cleanliness === "average"
        ? t("cleanlinessAverage")
        : t("cleanlinessTidy");

  const includeLabel = (key: string): string => {
    if (
      key === "wifi" ||
      key === "water" ||
      key === "electricity" ||
      key === "gas" ||
      key === "cleaning"
    ) {
      return t(`include.${key}`);
    }
    return key;
  };

  const cityLabel = (city: "cdmx" | "queretaro"): string =>
    city === "cdmx" ? t("cdmx") : t("queretaro");

  const backHref =
    listing.city === "cdmx"
      ? "/rooms-for-rent-cdmx"
      : listing.city === "queretaro"
        ? "/rooms-for-rent-queretaro"
        : "/rooms";

  const mapPin =
    (listing.city === "cdmx" || listing.city === "queretaro") &&
    listing.latitude !== null &&
    listing.longitude !== null
      ? {
          city: listing.city,
          latitude: listing.latitude,
          longitude: listing.longitude,
        }
      : null;

  const complexMapPin =
    complex?.latitude != null && complex.longitude != null
      ? {
          city: complex.city,
          latitude: complex.latitude,
          longitude: complex.longitude,
        }
      : null;

  const showComplexMap =
    complexMapPin !== null &&
    (mapPin === null ||
      mapPin.latitude !== complexMapPin.latitude ||
      mapPin.longitude !== complexMapPin.longitude);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={backHref}
          className="text-muted-foreground hover:text-foreground text-sm font-medium underline-offset-4 hover:underline"
        >
          {t("backToResults")}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <RoomShareButton
            listingId={listing.id}
            title={listing.title}
            description={listing.description}
          />
          {listing.host && !isHost ? (
            isSignedIn ? (
              myApplicationQuery.data &&
              myApplicationQuery.data.status !== "withdrawn" ? (
                <Button variant="outline" disabled>
                  {t("applied")}
                </Button>
              ) : (
                <Button
                  disabled={applyMutation.isPending}
                  onClick={() => {
                    applyMutation.mutate({ roomId: listing.id });
                  }}
                >
                  {applyMutation.isPending ? t("applying") : t("apply")}
                </Button>
              )
            ) : (
              <Button asChild>
                <Link href="/sign-in">{t("apply")}</Link>
              </Button>
            )
          ) : null}
        </div>
      </div>
      {applyError ? (
        <p className="text-destructive text-sm">{applyError}</p>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-2xl">
            {activeImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage.url}
                  alt={activeImage.alt ?? listing.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
                  {activeImage.source === "room"
                    ? t("photoRoom")
                    : t("photoApartment")}
                </span>
              </>
            ) : (
              <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                {t("noPhotos")}
              </div>
            )}
          </div>
          {galleryImages.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image.source}-${image.id}`}
                  type="button"
                  className={cn(
                    "bg-muted relative size-16 shrink-0 overflow-hidden rounded-lg border-2",
                    index === activeImageIndex
                      ? "border-foreground"
                      : "border-transparent opacity-80 hover:opacity-100",
                  )}
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.alt ?? listing.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-black/55 py-0.5 text-center text-[10px] font-medium text-white">
                    {image.source === "room"
                      ? t("photoRoomShort")
                      : t("photoApartmentShort")}
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {listing.title}
            </h1>
            {locationLabel.length > 0 ? (
              <p className="text-muted-foreground text-base">{locationLabel}</p>
            ) : null}
            {complex ? (
              <p className="text-sm">
                <span className="text-muted-foreground">{t("inComplex")} </span>
                <a
                  href="#apartment"
                  className="font-medium underline-offset-4 hover:underline"
                >
                  {complex.title}
                </a>
              </p>
            ) : null}
            <p className="text-brand text-2xl font-bold tabular-nums">
              {formatMxn(listing.rentPriceCents)}
              <span className="text-muted-foreground text-base font-medium">
                {t("perMonth")}
              </span>
            </p>
            <p className="text-muted-foreground text-sm">
              {t("availableDate", {
                date: formatAvailable(listing.availableFrom, t("availableNow")),
              })}
            </p>
          </div>

          {listing.host ? (
            <Link
              href={`/profiles/${listing.host.id}`}
              className="border-border hover:bg-muted/40 flex items-center gap-3 rounded-2xl border p-3 transition-colors"
            >
              {listing.host.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={listing.host.image}
                  alt={listing.host.name}
                  className="size-12 rounded-full object-cover"
                />
              ) : (
                <span className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full text-lg font-medium">
                  {listing.host.name.slice(0, 1).toUpperCase()}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  {t("host")}
                </p>
                <p className="font-semibold">{listing.host.name}</p>
                <p className="text-muted-foreground text-xs">
                  {tProfile("viewProfile")}
                </p>
              </div>
            </Link>
          ) : null}

          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <Fact
              label={t("capacity")}
              value={t("roomies", { count: listing.capacity })}
            />
            <Fact label={t("gender")} value={genderLabel} />
            <Fact label={t("bathroom")} value={bathroomLabel} />
            <Fact label={t("furnished")} value={furnishedLabel} />
            <Fact
              label={t("deposit")}
              value={t("monthsCount", { count: listing.depositMonths })}
            />
            <Fact
              label={t("lease")}
              value={t("monthsCount", { count: listing.leaseMonths })}
            />
            <Fact
              label={t("preferredAge")}
              value={t("ageRange", {
                min: listing.preferredAgeMin,
                max: listing.preferredAgeMax,
              })}
            />
            <Fact
              label={t("couples")}
              value={listing.couplesAllowed ? t("yes") : t("no")}
            />
            <Fact label={t("smoking")} value={smokingLabel} />
            <Fact label={t("guests")} value={guestsLabel} />
            <Fact
              label={t("wfh")}
              value={listing.wfhFriendly ? t("yes") : t("no")}
            />
            <Fact
              label={t("quiet")}
              value={listing.quietHome ? t("yes") : t("no")}
            />
            <Fact label={t("cleanliness")} value={cleanlinessLabel} />
            <Fact
              label={t("hasPets")}
              value={listing.hasPets ? t("yes") : t("no")}
            />
            <Fact
              label={t("acceptsPets")}
              value={listing.acceptsPets ? t("yes") : t("no")}
            />
          </dl>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("about")}</h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed whitespace-pre-wrap">
          {listing.description}
        </p>
      </section>

      {isHost ? (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{t("applicants")}</h2>
            <p className="text-muted-foreground text-sm">
              {t("applicantsHint")}
            </p>
          </div>
          {applicantsQuery.isPending ? (
            <p className="text-muted-foreground text-sm">
              {t("loadingApplicants")}
            </p>
          ) : (applicantsQuery.data?.length ?? 0) === 0 ? (
            <p className="text-muted-foreground text-sm">{t("noApplicants")}</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {applicantsQuery.data?.map((application) => (
                <ApplicantCard key={application.id} application={application} />
              ))}
            </div>
          )}
        </section>
      ) : null}

      {listing.includes.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">{t("includes")}</h2>
          <div className="flex flex-wrap gap-2">
            {listing.includes.map((item) => (
              <Pill key={item}>{includeLabel(item)}</Pill>
            ))}
          </div>
        </section>
      ) : null}

      {mapPin ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">{t("location")}</h2>
          <div className="border-border h-72 overflow-hidden rounded-2xl border sm:h-96">
            <RoomDetailMap
              city={mapPin.city}
              latitude={mapPin.latitude}
              longitude={mapPin.longitude}
            />
          </div>
        </section>
      ) : null}

      {complex ? (
        <section
          id="apartment"
          className="border-border space-y-6 border-t pt-10"
        >
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              {t("complexSection")}
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {complex.title}
            </h2>
            <p className="text-muted-foreground">
              {[
                complex.addressLine1,
                complex.neighborhood,
                cityLabel(complex.city),
              ].join(", ")}
            </p>
          </div>

          {complex.description.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{t("aboutComplex")}</h3>
              <p className="text-muted-foreground max-w-3xl leading-relaxed whitespace-pre-wrap">
                {complex.description}
              </p>
            </div>
          ) : null}

          <dl className="grid max-w-md grid-cols-2 gap-2">
            <Fact
              label={t("pets")}
              value={complex.petFriendly ? t("yes") : t("no")}
            />
            <Fact
              label={t("complexPhotos")}
              value={String(complex.images.length)}
            />
          </dl>

          {complex.amenities.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">{t("amenities")}</h3>
              <div className="flex flex-wrap gap-2">
                {complex.amenities.map((amenity) => (
                  <Pill key={amenity}>{amenity}</Pill>
                ))}
              </div>
            </div>
          ) : null}

          {complex.images.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">{t("complexGallery")}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {complex.images.map((image) => (
                  <button
                    key={image.id}
                    type="button"
                    className="bg-muted aspect-4/3 overflow-hidden rounded-2xl text-left"
                    onClick={() => {
                      const index = galleryImages.findIndex(
                        (item) =>
                          item.source === "complex" && item.id === image.id,
                      );
                      if (index >= 0) {
                        setActiveImageIndex(index);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.url}
                      alt={image.alt ?? complex.title}
                      className="h-full w-full object-cover transition-transform hover:scale-[1.02]"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {showComplexMap ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">{t("complexLocation")}</h3>
              <div className="border-border h-64 overflow-hidden rounded-2xl border sm:h-80">
                <RoomDetailMap
                  city={complexMapPin.city}
                  latitude={complexMapPin.latitude}
                  longitude={complexMapPin.longitude}
                />
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
