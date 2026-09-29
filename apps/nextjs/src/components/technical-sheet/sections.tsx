import type { JSX } from "react";
import { Image, Link, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { SheetFact } from "~/lib/technical-sheet/types";
import { SectionTitle } from "./section-title";
import { colors, styles, upper } from "./theme";

const s = StyleSheet.create({
  paragraph: {
    marginTop: 8,
  },
  twoColumns: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  factRow: {
    width: "48%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    borderBottomWidth: 0.6,
    borderBottomColor: colors.border,
  },
  factLabel: {
    fontSize: 9,
    color: colors.mutedForeground,
  },
  factValue: {
    fontSize: 9,
    fontWeight: 600,
    color: colors.foreground,
    textAlign: "right",
  },
  listItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  bullet: {
    width: 5,
    height: 5,
    marginRight: 9,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  listText: {
    fontSize: 9.5,
    color: colors.secondaryForeground,
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    marginRight: 6,
    marginBottom: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
  },
  pillText: {
    fontSize: 8.5,
    fontWeight: 500,
    color: colors.primary,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 0.6,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  locationBody: {
    flex: 1,
    paddingRight: 16,
  },
  address: {
    fontSize: 11,
    fontWeight: 600,
    lineHeight: 1.45,
    color: colors.foreground,
  },
  scanLabel: {
    marginTop: 12,
    fontSize: 8,
    fontWeight: 500,
    letterSpacing: 1.2,
    color: colors.mutedForeground,
  },
  url: {
    marginTop: 3,
    fontSize: 8,
    color: colors.primary,
    textDecoration: "none",
  },
  qrFrame: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 0.6,
    borderColor: colors.border,
  },
  qr: {
    width: 84,
    height: 84,
  },
});

/** Paragraphs up to this length are kept on the same page as the section title. */
const KEEP_WITH_TITLE_CHARS = 700;

const toParagraphs = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

export const DescriptionSection = ({
  title,
  text,
}: {
  title: string;
  text: string;
}): JSX.Element | null => {
  const [first, ...rest] = toParagraphs(text);
  if (!first) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View wrap={first.length > KEEP_WITH_TITLE_CHARS}>
        <SectionTitle>{title}</SectionTitle>
        <Text style={styles.bodyText}>{first}</Text>
      </View>
      {rest.map((paragraph, index) => (
        <Text key={index} style={[styles.bodyText, s.paragraph]}>
          {paragraph}
        </Text>
      ))}
    </View>
  );
};

export const FactsSection = ({
  title,
  facts,
}: {
  title: string;
  facts: SheetFact[];
}): JSX.Element | null =>
  facts.length > 0 ? (
    <View style={styles.section}>
      <SectionTitle>{title}</SectionTitle>
      <View style={s.twoColumns}>
        {facts.map((fact) => (
          <View key={fact.label} style={s.factRow} wrap={false}>
            <Text style={s.factLabel}>{fact.label}</Text>
            <Text style={s.factValue}>{fact.value}</Text>
          </View>
        ))}
      </View>
    </View>
  ) : null;

export const AmenitiesSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}): JSX.Element | null =>
  items.length > 0 ? (
    <View style={styles.section}>
      <SectionTitle>{title}</SectionTitle>
      <View style={s.twoColumns}>
        {items.map((item) => (
          <View key={item} style={s.listItem} wrap={false}>
            <View style={s.bullet} />
            <Text style={s.listText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  ) : null;

export const IncludesSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}): JSX.Element | null =>
  items.length > 0 ? (
    <View style={styles.section}>
      <SectionTitle>{title}</SectionTitle>
      <View style={s.pills}>
        {items.map((item) => (
          <View key={item} style={s.pill}>
            <Text style={s.pillText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  ) : null;

export const LocationSection = ({
  title,
  address,
  scanLabel,
  url,
  qrCode,
}: {
  title: string;
  address: string;
  scanLabel: string;
  url: string;
  qrCode: string | null;
}): JSX.Element => (
  <View style={styles.section} wrap={false}>
    <SectionTitle>{title}</SectionTitle>
    <View style={s.locationCard}>
      <View style={s.locationBody}>
        <Text style={s.address}>{address}</Text>
        <Text style={s.scanLabel}>{upper(scanLabel)}</Text>
        <Link src={url} style={s.url}>
          {url}
        </Link>
      </View>
      {qrCode ? (
        <View style={s.qrFrame}>
          <Image src={qrCode} style={s.qr} />
        </View>
      ) : null}
    </View>
  </View>
);
