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

type HostProperty = RouterOutputs["listing"]["mine"]["properties"][number];

export const HostPropertiesSection = ({
  properties,
}: {
  properties: HostProperty[];
}): JSX.Element => {
  const t = useTranslations("host");
  const tList = useTranslations("list");

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{t("properties")}</h2>
        <p className="text-muted-foreground text-sm">{t("propertiesHint")}</p>
      </div>
      {properties.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("emptyProperties")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {properties.map((property) => (
            <Card key={property.id}>
              <CardHeader>
                <CardTitle>{property.title}</CardTitle>
                <CardDescription>
                  {property.isSharedBuilding
                    ? t("sharedBuilding")
                    : tList(`propertyTypeOption.${property.propertyType}`)}
                  {` · ${property.neighborhood} · ${property.city}`}
                  {` · ${t("listingCount", { count: property.listingCount })}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/host/properties/${property.id}/edit`}>
                    {t("edit")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};
