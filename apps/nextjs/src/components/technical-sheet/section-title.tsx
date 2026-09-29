import type { JSX } from "react";
import { Text, View } from "@react-pdf/renderer";

import { styles, upper } from "./theme";

/** `keepWith` is the minimum space (pt) of following content that must fit on the same page. */
export const SectionTitle = ({
  children,
  keepWith = 60,
}: {
  children: string;
  keepWith?: number;
}): JSX.Element => (
  <View style={styles.sectionTitleRow} minPresenceAhead={keepWith}>
    <Text style={styles.sectionTitle}>{upper(children)}</Text>
    <View style={styles.sectionRule} />
  </View>
);
