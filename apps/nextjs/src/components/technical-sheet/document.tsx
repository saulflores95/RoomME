import type { JSX } from "react";
import { Document, Page } from "@react-pdf/renderer";

import type { TechnicalSheetData } from "~/lib/technical-sheet/types";
import { SheetFooter } from "./footer";
import { SheetGallery } from "./gallery";
import { SheetHeader } from "./header";
import { SheetHero } from "./hero";
import {
  AmenitiesSection,
  DescriptionSection,
  FactsSection,
  IncludesSection,
  LocationSection,
} from "./sections";
import { SheetStatsRow } from "./stats-row";
import { fontFamilyFor, styles } from "./theme";

export const TechnicalSheetDocument = ({
  data,
}: {
  data: TechnicalSheetData;
}): JSX.Element => {
  const { labels } = data;

  return (
    <Document
      title={`${data.title} · RooMe`}
      author={data.host?.name ?? "RooMe"}
      subject={data.reference}
      creator="RooMe"
      producer="RooMe"
      language={data.locale}
    >
      <Page
        size="A4"
        style={[styles.page, { fontFamily: fontFamilyFor(data.locale) }]}
      >
        <SheetFooter labels={labels} />
        <SheetHeader host={data.host} />
        <SheetHero data={data} />
        <SheetStatsRow stats={data.stats} />
        <SheetGallery title={labels.gallery} images={data.gallery} />
        <DescriptionSection
          title={labels.description}
          text={data.description}
        />
        <FactsSection title={labels.features} facts={data.facts} />
        <AmenitiesSection title={labels.amenities} items={data.amenities} />
        <IncludesSection title={labels.includes} items={data.includes} />
        <LocationSection
          title={labels.location}
          address={data.address}
          scanLabel={labels.scanToView}
          url={data.listingUrl}
          qrCode={data.qrCode}
        />
      </Page>
    </Document>
  );
};
