import type { JSX } from "react";
import { Path, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";

import type { SheetHost } from "~/lib/technical-sheet/types";
import { colors } from "./theme";

const LOGO_PATH =
  "M2.2 6.5h27.6v21.5H2.2V6.5Zm2.3 21.5V12.8a3.1 3.1 0 0 1 6.2 0V28H4.5Zm8.5 0V12.8a3.1 3.1 0 0 1 6.2 0V28H13Zm8.5 0V12.8a3.1 3.1 0 0 1 6.2 0V28H21.5Z";

const s = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 0.6,
    borderBottomColor: colors.border,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
  },
  wordmark: {
    marginLeft: 7,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: -0.4,
    color: colors.foreground,
  },
  wordmarkAccent: {
    color: colors.primary,
  },
  contact: {
    alignItems: "flex-end",
  },
  hostName: {
    fontSize: 10.5,
    fontWeight: 600,
    color: colors.foreground,
  },
  hostMeta: {
    marginTop: 2,
    fontSize: 8.5,
    color: colors.mutedForeground,
  },
});

export const SheetLogo = ({ size = 20 }: { size?: number }): JSX.Element => (
  <Svg viewBox="0 0 32 32" width={size} height={size}>
    <Path d={LOGO_PATH} fill={colors.primary} fillRule="evenodd" />
  </Svg>
);

export const SheetHeader = ({
  host,
}: {
  host: SheetHost | null;
}): JSX.Element => {
  const meta = [host?.phone, host?.email]
    .filter((part): part is string => part != null && part.length > 0)
    .join("  ·  ");

  return (
    <View style={s.root}>
      <View style={s.brand}>
        <SheetLogo />
        <Text style={s.wordmark}>
          Roo<Text style={s.wordmarkAccent}>Me</Text>
        </Text>
      </View>
      {host ? (
        <View style={s.contact}>
          <Text style={s.hostName}>{host.name}</Text>
          {meta.length > 0 ? <Text style={s.hostMeta}>{meta}</Text> : null}
        </View>
      ) : null}
    </View>
  );
};
