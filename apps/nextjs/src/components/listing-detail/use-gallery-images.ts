import { useMemo } from "react";

import type { ListingDetailData } from "./detail-types";

export type GallerySource = "room" | "property";

export interface GalleryImage {
  id: string;
  url: string;
  alt: string | null;
  source: GallerySource;
}

export const useGalleryImages = (listing: ListingDetailData): GalleryImage[] =>
  useMemo((): GalleryImage[] => {
    const roomImages = listing.images.map(
      (image): GalleryImage => ({ ...image, source: "room" }),
    );
    const propertyImages =
      listing.property?.images.map(
        (image): GalleryImage => ({ ...image, source: "property" }),
      ) ?? [];

    if (roomImages.length > 0 || propertyImages.length > 0) {
      return [...roomImages, ...propertyImages];
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
