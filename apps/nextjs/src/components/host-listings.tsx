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

import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

export function HostListings(): JSX.Element {
  const t = useTranslations("host");
  const trpc = useTRPC();
  const query = useQuery(trpc.listing.mine.queryOptions());
  const rooms = query.data?.rooms ?? [];
  const complexes = query.data?.complexes ?? [];
  const canManageComplexes = query.data?.canManageComplexes ?? false;

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
            {rooms.map((room) => (
              <Card key={room.id}>
                <CardHeader>
                  <CardTitle>{room.title}</CardTitle>
                  <CardDescription>
                    {room.neighborhood}
                    {room.city ? ` · ${room.city}` : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/host/rooms/${room.id}/edit`}>
                      {t("edit")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

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
