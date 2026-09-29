import type { JSX } from "react";
import { Image, StyleSheet, View } from "@react-pdf/renderer";

import type { SheetImage } from "~/lib/technical-sheet/types";
import { SectionTitle } from "./section-title";
import { colors, CONTENT_WIDTH, styles } from "./theme";

const COLUMNS = 3;
const GAP = 8;
const TILE_WIDTH = (CONTENT_WIDTH - GAP * (COLUMNS - 1)) / COLUMNS;
const TILE_HEIGHT = TILE_WIDTH * 0.7;

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: GAP,
  },
  tile: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.muted,
  },
  tileSpaced: {
    marginLeft: GAP,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const toRows = (images: SheetImage[]): SheetImage[][] =>
  Array.from({ length: Math.ceil(images.length / COLUMNS) }, (_, index) =>
    images.slice(index * COLUMNS, index * COLUMNS + COLUMNS),
  );

export const SheetGallery = ({
  title,
  images,
}: {
  title: string;
  images: SheetImage[];
}): JSX.Element | null => {
  if (images.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <SectionTitle keepWith={TILE_HEIGHT + GAP}>{title}</SectionTitle>
      {toRows(images).map((row, rowIndex) => (
        <View key={rowIndex} style={s.row} wrap={false}>
          {row.map((image, index) => (
            <View
              key={index}
              style={index === 0 ? s.tile : [s.tile, s.tileSpaced]}
            >
              <Image src={image} style={s.image} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
