"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";

import { ApplicantCard } from "~/components/applicant-card";
import { ApplicationDecision } from "~/components/listing-detail/host-applicants";
import { useApplicationActions } from "~/hooks/use-application-actions";

type ApplicationGroup = RouterOutputs["application"]["listForHost"][number];

export const HostApplicationsSection = ({
  groups,
}: {
  groups: ApplicationGroup[];
}): JSX.Element | null => {
  const t = useTranslations("host");
  const tRooms = useTranslations("rooms");
  const actions = useApplicationActions();

  if (groups.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{t("applicants")}</h2>
        <p className="text-muted-foreground text-sm">{t("applicantsHint")}</p>
      </div>
      {groups.map((group) => (
        <div key={group.roomId} className="space-y-3">
          <h3 className="font-medium">
            {group.roomTitle}
            {group.operationType === "sale" ? (
              <span className="text-muted-foreground font-normal">
                {` · ${tRooms("saleInquiries")}`}
              </span>
            ) : null}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.applications.map((application) => (
              <div key={application.id} className="space-y-2">
                <ApplicantCard application={application} />
                <ApplicationDecision
                  application={application}
                  actions={actions}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
