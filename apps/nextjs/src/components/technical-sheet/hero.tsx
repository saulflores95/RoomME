import type { JSX } from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { TechnicalSheetData } from "~/lib/technical-sheet/types";
import { SheetLogo } from "./header";
import { colors, upper } from "./theme";

const HERO_HEIGHT = 270;

const s = StyleSheet.create({
  root: {
    marginTop: 20,
  },
  imageFrame: {
    height: HERO_HEIGHT,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: colors.muted,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  placeholder: {
    height: HERO_HEIGHT,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 14,
    left: 14,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  badgeText: {
    fontSize: 7.5,
    fontWeight: 600,
    letterSpacing: 1.6,
    color: colors.white,
  },
  metaRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontSize: 8,
    fontWeight: 500,
    letterSpacing: 1.8,
    color: colors.mutedForeground,
  },
  reference: {
    fontSize: 8,
    color: colors.mutedForeground,
  },
  title: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: -0.4,
    color: colors.foreground,
  },
  price: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: -0.6,
    color: colors.primary,
  },
  priceSuffix: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0,
    color: colors.mutedForeground,
  },
});

export const SheetHero = ({
  data,
}: {
  data: TechnicalSheetData;
}): JSX.Element => (
  <View style={s.root}>
    <View>
      {data.hero ? (
        <View style={s.imageFrame}>
          <Image src={data.hero} style={s.image} />
        </View>
      ) : (
        <View style={s.placeholder}>
          <SheetLogo size={56} />
        </View>
      )}
      <View style={s.badge}>
        <Text style={s.badgeText}>{upper(data.badge)}</Text>
      </View>
    </View>

    <View style={s.metaRow}>
      <Text style={s.location}>{upper(data.location)}</Text>
      <Text style={s.reference}>{data.reference}</Text>
    </View>
    <Text style={s.title}>{data.title}</Text>
    <Text style={s.price}>
      {data.price}
      {data.priceSuffix ? (
        <Text style={s.priceSuffix}>{`  ${data.priceSuffix}`}</Text>
      ) : null}
    </Text>
  </View>
);
