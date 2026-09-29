"use client";

import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";

import type { ApplicationActions } from "~/hooks/use-application-actions";
import { ApplicantCard } from "~/components/applicant-card";
import { useApplicationActions } from "~/hooks/use-application-actions";
import { useTRPC } from "~/trpc/react";
import { formatDateKey } from "./format";

type RoomApplication = RouterOutputs["application"]["listForRoom"][number];

export const ApplicationDecision = ({
  application,
  actions,
}: {
  application: Pick<
    RoomApplication,
    "id" | "status" | "moveInDate" | "leaseMonths"
  >;
  actions: ApplicationActions;
}): JSX.Element => {
  const t = useTranslations("host");
  const tRooms = useTranslations("rooms");
  const busy = actions.pendingId === application.id;

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {application.moveInDate && application.leaseMonths ? (
        <span className="text-muted-foreground">
          {tRooms("applicationDates", {
            date: formatDateKey(application.moveInDate),
            count: application.leaseMonths,
          })}
        </span>
      ) : null}
      {application.status === "pending" ? (
        <>
          <Button
            size="sm"
            disabled={busy}
            onClick={() => {
              actions.accept(application.id);
            }}
          >
            {t("accept")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={() => {
              actions.decline(application.id);
            }}
          >
            {t("decline")}
          </Button>
        </>
      ) : (
        <span className="border-border rounded-full border px-2 py-0.5 text-xs font-medium">
          {t(`applicationStatus.${application.status}`)}
        </span>
      )}
    </div>
  );
};

export const HostApplicants = ({
  listingId,
}: {
  listingId: string;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const trpc = useTRPC();
  const actions = useApplicationActions();
  const applicantsQuery = useQuery(
    trpc.application.listForRoom.queryOptions({ roomId: listingId }),
  );
  const applicants = applicantsQuery.data ?? [];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{t("applicants")}</h2>
        <p className="text-muted-foreground text-sm">{t("applicantsHint")}</p>
      </div>
      {applicantsQuery.isPending ? (
        <p className="text-muted-foreground text-sm">
          {t("loadingApplicants")}
        </p>
      ) : applicants.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("noApplicants")}</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {applicants.map((application) => (
            <div key={application.id} className="space-y-2">
              <ApplicantCard application={application} />
              <ApplicationDecision
                application={application}
                actions={actions}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
