import type { JSX } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import type { SheetStat } from "~/lib/technical-sheet/types";
import { colors, upper } from "./theme";

const s = StyleSheet.create({
  root: {
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 0.6,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  cell: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  divider: {
    borderLeftWidth: 0.6,
    borderLeftColor: colors.border,
  },
  value: {
    fontSize: 17,
    fontWeight: 600,
    letterSpacing: -0.3,
    color: colors.foreground,
    textAlign: "center",
  },
  label: {
    marginTop: 4,
    fontSize: 7,
    fontWeight: 500,
    letterSpacing: 1.2,
    color: colors.mutedForeground,
    textAlign: "center",
  },
});

export const SheetStatsRow = ({
  stats,
}: {
  stats: SheetStat[];
}): JSX.Element | null => {
  if (stats.length === 0) {
    return null;
  }

  return (
    <View style={s.root} wrap={false}>
      {stats.map((stat, index) => (
        <View
          key={stat.label}
          style={index === 0 ? s.cell : [s.cell, s.divider]}
        >
          <Text style={s.value}>{stat.value}</Text>
          <Text style={s.label}>{upper(stat.label)}</Text>
        </View>
      ))}
    </View>
  );
};
