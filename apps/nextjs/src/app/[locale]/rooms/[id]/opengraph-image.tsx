import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import type { RouterOutputs } from "@acme/api";

import { formatMxn } from "~/lib/money";
import { fetchQuery, trpc } from "~/trpc/server";

type ListingDetail = RouterOutputs["listing"]["byId"];

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "RooMe room listing";

const cityLabel = (
  city: string | null,
  t: Awaited<ReturnType<typeof getTranslations>>,
): string => {
  if (city === "queretaro") {
    return t("queretaro");
  }
  return "";
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<ImageResponse> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "rooms" });
  const listing = await fetchQuery<ListingDetail>(
    trpc.listing.byId.queryOptions({ id }),
  );

  const title = listing?.title ?? t("detailTitle");
  const price = listing ? formatMxn(listing.rentPriceCents) : "";
  const location = listing
    ? [listing.neighborhood, cityLabel(listing.city, t)]
        .filter((part): part is string => Boolean(part && part.length > 0))
        .join(", ")
    : "";
  const coverUrl = listing?.coverUrl ?? null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        {coverUrl ? (
          <img
            src={coverUrl}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(135deg, #0f766e 0%, #134e4a 45%, #0f172a 100%)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(180deg, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.55) 40%, rgba(15,23,42,0.92) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "48px 56px",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            RooMe
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                maxWidth: 980,
              }}
            >
              {title.length > 80 ? `${title.slice(0, 79)}…` : title}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 28,
                opacity: 0.95,
              }}
            >
              {price.length > 0 ? (
                <span style={{ fontWeight: 600 }}>
                  {price}
                  <span style={{ fontWeight: 400, opacity: 0.85 }}>
                    {" "}
                    {t("perMonth")}
                  </span>
                </span>
              ) : null}
              {price.length > 0 && location.length > 0 ? (
                <span style={{ opacity: 0.6 }}>·</span>
              ) : null}
              {location.length > 0 ? <span>{location}</span> : null}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
