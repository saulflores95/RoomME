import sharp from "sharp";

import type { SheetImage } from "./types";

const FETCH_TIMEOUT_MS = 10_000;
const HERO_WIDTH = 1600;
const GALLERY_WIDTH = 800;
export const MAX_GALLERY_IMAGES = 6;

export interface SheetImages {
  hero: SheetImage | null;
  gallery: SheetImage[];
}

class SheetImageError extends Error {
  constructor(url: string, cause: unknown) {
    super(`Failed to load technical sheet image: ${url}`, { cause });
    this.name = "SheetImageError";
  }
}

/** react-pdf only embeds JPEG and PNG, so every photo is normalized to JPEG. */
const toJpegDataUrl = async (
  url: string,
  width: number,
): Promise<SheetImage> => {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const input = Buffer.from(await response.arrayBuffer());
  const output = await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return `data:image/jpeg;base64,${output.toString("base64")}`;
};

const loadSafely = async (
  url: string,
  width: number,
): Promise<SheetImage | null> => {
  try {
    return await toJpegDataUrl(url, width);
  } catch (error) {
    console.error(new SheetImageError(url, error));
    return null;
  }
};

export const loadSheetImages = async (
  urls: readonly string[],
): Promise<SheetImages> => {
  const [heroUrl, ...rest] = urls;
  const galleryUrls = rest.slice(0, MAX_GALLERY_IMAGES);

  const [hero, ...gallery] = await Promise.all([
    heroUrl ? loadSafely(heroUrl, HERO_WIDTH) : Promise.resolve(null),
    ...galleryUrls.map((url) => loadSafely(url, GALLERY_WIDTH)),
  ]);

  return {
    hero: hero ?? null,
    gallery: gallery.filter((image): image is SheetImage => image !== null),
  };
};
