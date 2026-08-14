"use client";

import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";

import { ApplicantCard } from "~/components/applicant-card";
import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

export function HostListings(): JSX.Element {
  const t = useTranslations("host");
  const trpc = useTRPC();
  const query = useQuery(trpc.listing.mine.queryOptions());
  const applicationsQuery = useQuery(
    trpc.application.listForHost.queryOptions(),
  );
  const rooms = query.data?.rooms ?? [];
  const complexes = query.data?.complexes ?? [];
  const canManageComplexes = query.data?.canManageComplexes ?? false;
  const applicationsByRoom = applicationsQuery.data ?? [];

  if (query.isPending) {
    return <p className="text-muted-foreground">{t("loading")}</p>;
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/list-a-room">{t("createRoom")}</Link>
        </Button>
        {canManageComplexes ? (
          <Button variant="outline" asChild>
            <Link href="/list-a-complex">{t("createComplex")}</Link>
          </Button>
        ) : null}
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("rooms")}</h2>
        {rooms.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t("emptyRooms")}</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {rooms.map((room) => {
              const applicantCount =
                applicationsByRoom.find((entry) => entry.roomId === room.id)
                  ?.applications.length ?? 0;

              return (
                <Card key={room.id}>
                  <CardHeader>
                    <CardTitle>{room.title}</CardTitle>
                    <CardDescription>
                      {room.neighborhood}
                      {room.city ? ` · ${room.city}` : ""}
                      {applicantCount > 0
                        ? ` · ${t("applicantCount", { count: applicantCount })}`
                        : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/host/rooms/${room.id}/edit`}>
                        {t("edit")}
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/rooms/${room.id}`}>
                        {t("viewApplicants")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {applicationsByRoom.length > 0 ? (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{t("applicants")}</h2>
            <p className="text-muted-foreground text-sm">
              {t("applicantsHint")}
            </p>
          </div>
          {applicationsByRoom.map((group) => (
            <div key={group.roomId} className="space-y-3">
              <h3 className="font-medium">{group.roomTitle}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.applications.map((application) => (
                  <ApplicantCard
                    key={application.id}
                    application={application}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {canManageComplexes ? (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{t("complexes")}</h2>
            <p className="text-muted-foreground text-sm">
              {t("complexesHint")}
            </p>
          </div>
          {complexes.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t("emptyComplexes")}
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {complexes.map((complex) => (
                <Card key={complex.id}>
                  <CardHeader>
                    <CardTitle>{complex.title}</CardTitle>
                    <CardDescription>
                      {complex.neighborhood} · {complex.city}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/host/complexes/${complex.id}/edit`}>
                        {t("edit")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}
