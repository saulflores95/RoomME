"use client";

import type { JSX } from "react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";

import { HostApplicationsSection } from "~/components/host/host-applications-section";
import { HostBookingsSection } from "~/components/host/host-bookings-section";
import { HostPropertiesSection } from "~/components/host/host-properties-section";
import { HostRoomsSection } from "~/components/host/host-rooms-section";
import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

export function HostListings(): JSX.Element {
  const t = useTranslations("host");
  const trpc = useTRPC();
  const query = useQuery(trpc.listing.mine.queryOptions());
  const applicationsQuery = useQuery(
    trpc.application.listForHost.queryOptions(),
  );
  const applicationGroups = useMemo(
    () => applicationsQuery.data ?? [],
    [applicationsQuery.data],
  );
  const applicantCounts = useMemo(
    () =>
      new Map(
        applicationGroups.map((group) => [
          group.roomId,
          group.applications.filter((item) => item.status === "pending").length,
        ]),
      ),
    [applicationGroups],
  );

  if (query.isPending) {
    return <p className="text-muted-foreground">{t("loading")}</p>;
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/list">{t("createListing")}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/list-a-complex">{t("createProperty")}</Link>
        </Button>
      </div>

      <HostRoomsSection
        rooms={query.data?.rooms ?? []}
        applicantCounts={applicantCounts}
      />
      <HostApplicationsSection groups={applicationGroups} />
      <HostBookingsSection />
      <HostPropertiesSection properties={query.data?.properties ?? []} />
    </div>
  );
}
