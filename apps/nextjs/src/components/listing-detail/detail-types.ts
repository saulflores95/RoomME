import type { RouterOutputs } from "@acme/api";

export type ListingDetailData = NonNullable<RouterOutputs["listing"]["byId"]>;
export type ListingDetailProperty = NonNullable<ListingDetailData["property"]>;
