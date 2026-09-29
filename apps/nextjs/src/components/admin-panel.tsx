"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@acme/ui";

import { AdminAgents } from "~/components/admin-agents";
import { AdminListings } from "~/components/admin-listings";
import { AdminProperties } from "~/components/admin-properties";

type AdminTab = "agents" | "listings" | "properties";

export function AdminPanel(): JSX.Element {
  const t = useTranslations("admin");
  const [tab, setTab] = useState<AdminTab>("agents");

  const tabs: { id: AdminTab; label: string }[] = [
    { id: "agents", label: t("tabAgents") },
    { id: "listings", label: t("tabListings") },
    { id: "properties", label: t("tabProperties") },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-muted inline-flex w-fit rounded-full p-0.5">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              tab === item.id
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "agents" ? <AdminAgents /> : null}
      {tab === "listings" ? <AdminListings /> : null}
      {tab === "properties" ? <AdminProperties /> : null}
    </div>
  );
}
