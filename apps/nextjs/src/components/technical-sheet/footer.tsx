import type { JSX } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import type { SheetLabels } from "~/lib/technical-sheet/types";
import { colors, CONTENT_WIDTH, PAGE_PADDING_X } from "./theme";

const s = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 24,
    left: PAGE_PADDING_X,
    width: CONTENT_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 0.6,
    borderTopColor: colors.border,
  },
  text: {
    fontSize: 7,
    color: colors.mutedForeground,
  },
});

/** react-pdf drops `render` text when a `lineHeight` is inherited, so none is set on the page. */
export const SheetFooter = ({
  labels,
}: {
  labels: SheetLabels;
}): JSX.Element => (
  <View style={s.root} fixed>
    <Text style={s.text}>
      {`${labels.generatedOn}  ·  ${labels.disclaimer}`}
    </Text>
    <Text
      style={s.text}
      render={({ pageNumber, totalPages }) =>
        `${labels.page} ${pageNumber}/${totalPages}  ·  ${labels.poweredBy} RooMe`
      }
    />
  </View>
);
