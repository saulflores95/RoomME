"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react";
import { RoomCard } from "./room-card";

export function FeaturedRoomsList() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.listing.list.queryOptions({ limit: 4 }),
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((listing) => (
        <RoomCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
