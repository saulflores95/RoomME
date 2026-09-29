import path from "node:path";
import { Font, StyleSheet } from "@react-pdf/renderer";

import type { Locale } from "@acme/i18n";

import { SHEET_COLORS } from "~/lib/technical-sheet/colors";

export const colors = SHEET_COLORS;

const FONTS_DIR = path.join(process.cwd(), "src", "assets", "fonts");
const fontFile = (file: string): string => path.join(FONTS_DIR, file);

const SHEET_FONT_FAMILIES = ["Geist", "NotoSansJP", "NotoSansKR"] as const;

type SheetFontFamily = (typeof SHEET_FONT_FAMILIES)[number];

const CJK_PATTERN = /[\u3000-\u9fff\uac00-\ud7af\uff00-\uffef]/;

/**
 * Replaces react-pdf's global font registry with fresh font objects. Fonts reused across
 * documents keep cached glyph subsets from earlier renders, which drops characters.
 */
export const resetSheetFonts = (): void => {
  // `Font.clear()` would also drop the built-in Helvetica react-pdf falls back to.
  const registry = Font.getRegisteredFonts();
  for (const family of SHEET_FONT_FAMILIES) {
    delete registry[family];
  }

  Font.register({
    family: "Geist",
    fonts: [
      { src: fontFile("Geist-Regular.ttf"), fontWeight: 400 },
      { src: fontFile("Geist-Medium.ttf"), fontWeight: 500 },
      { src: fontFile("Geist-SemiBold.ttf"), fontWeight: 600 },
      { src: fontFile("Geist-Bold.ttf"), fontWeight: 700 },
    ],
  });
  Font.register({
    family: "NotoSansJP",
    fonts: [
      { src: fontFile("NotoSansJP-Regular.otf"), fontWeight: 400 },
      { src: fontFile("NotoSansJP-Bold.otf"), fontWeight: 700 },
    ],
  });
  Font.register({
    family: "NotoSansKR",
    fonts: [
      { src: fontFile("NotoSansKR-Regular.otf"), fontWeight: 400 },
      { src: fontFile("NotoSansKR-Bold.otf"), fontWeight: 700 },
    ],
  });

  // CJK text has no spaces, so it must be breakable per character to wrap.
  Font.registerHyphenationCallback((word) =>
    CJK_PATTERN.test(word) ? Array.from(word) : [word],
  );
};

export const fontFamilyFor = (locale: Locale): SheetFontFamily => {
  if (locale === "ja") {
    return "NotoSansJP";
  }
  if (locale === "ko") {
    return "NotoSansKR";
  }
  return "Geist";
};

/** react-pdf measures text before `textTransform`, which clips letter-spaced labels. */
export const upper = (text: string): string => text.toLocaleUpperCase();

export const PAGE_PADDING_X = 40;
export const CONTENT_WIDTH = 595.28 - PAGE_PADDING_X * 2;

export const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 64,
    paddingHorizontal: PAGE_PADDING_X,
    backgroundColor: colors.white,
    color: colors.foreground,
    fontSize: 10,
  },
  section: {
    marginTop: 26,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 600,
    letterSpacing: 2.4,
    color: colors.primary,
  },
  sectionRule: {
    flexGrow: 1,
    height: 0.6,
    marginLeft: 12,
    backgroundColor: colors.border,
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.65,
    color: colors.secondaryForeground,
  },
  muted: {
    color: colors.mutedForeground,
  },
});
