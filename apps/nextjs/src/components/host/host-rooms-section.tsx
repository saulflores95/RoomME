"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";

import { Link } from "~/i18n/navigation";

type HostRoom = RouterOutputs["listing"]["mine"]["rooms"][number];

export const HostRoomsSection = ({
  rooms,
  applicantCounts,
}: {
  rooms: HostRoom[];
  applicantCounts: ReadonlyMap<string, number>;
}): JSX.Element => {
  const t = useTranslations("host");
  const tRooms = useTranslations("rooms");

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{t("rooms")}</h2>
      {rooms.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("emptyRooms")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {rooms.map((room) => {
            const applicantCount = applicantCounts.get(room.id) ?? 0;
            return (
              <Card key={room.id}>
                <CardHeader>
                  <CardTitle>{room.title}</CardTitle>
                  <CardDescription>
                    {tRooms(
                      room.listingType === "entire_property"
                        ? "listingTypeEntire"
                        : "listingTypeRoom",
                    )}
                    {` · ${room.neighborhood}`}
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
  );
};
