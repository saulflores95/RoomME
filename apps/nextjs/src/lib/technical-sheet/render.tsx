import type { JSX } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@acme/i18n";

import type { TechnicalSheetListing } from "./sheet-data";
import type { TechnicalSheetData } from "./types";
import { TechnicalSheetDocument } from "~/components/technical-sheet/document";
import { resetSheetFonts } from "~/components/technical-sheet/theme";
import { loadSheetImages } from "./load-images";
import { createQrDataUrl } from "./qr";
import { buildTechnicalSheetData } from "./sheet-data";

export interface RenderSheetInput {
  listing: TechnicalSheetListing;
  locale: Locale;
  listingUrl: string;
}

let renderQueue: Promise<unknown> = Promise.resolve();

/** Renders run one at a time because each one swaps react-pdf's global font registry. */
const renderSerially = (element: JSX.Element): Promise<Buffer> => {
  const run = renderQueue.then(() => {
    resetSheetFonts();
    return renderToBuffer(element);
  });
  renderQueue = run.catch(() => undefined);
  return run;
};

export const renderSheetPdf = (data: TechnicalSheetData): Promise<Buffer> =>
  renderSerially(<TechnicalSheetDocument data={data} />);

export const renderTechnicalSheet = async ({
  listing,
  locale,
  listingUrl,
}: RenderSheetInput): Promise<Buffer> => {
  const [rooms, list, sheet, images, qrCode] = await Promise.all([
    getTranslations({ locale, namespace: "rooms" }),
    getTranslations({ locale, namespace: "list" }),
    getTranslations({ locale, namespace: "technicalSheet" }),
    loadSheetImages(listing.images.map((image) => image.url)),
    createQrDataUrl(listingUrl),
  ]);

  const data = buildTechnicalSheetData({
    listing,
    locale,
    t: { rooms, list, sheet },
    images,
    qrCode,
    listingUrl,
    generatedAt: new Date(),
  });

  return renderSheetPdf(data);
};

export const technicalSheetFilename = (title: string, code: string): string => {
  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `ficha-${slug.length > 0 ? slug : "roome"}-${code}.pdf`;
};
