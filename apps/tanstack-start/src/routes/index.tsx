import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { AuthShowcase } from "~/component/auth-showcase";
import { useTRPC } from "~/lib/trpc";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    const { trpc, queryClient } = context;
    void queryClient.prefetchQuery(
      trpc.listing.list.queryOptions({ limit: 12 }),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="container py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight">RoomMe</h1>
        <p className="text-muted-foreground">
          Use the Next.js app for the full experience.
        </p>
        <AuthShowcase />
        <Suspense>
          <ListingList />
        </Suspense>
      </div>
    </main>
  );
}

function ListingList() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.listing.list.queryOptions({ limit: 12 }),
  );

  return (
    <ul className="w-full max-w-xl space-y-2">
      {data.map((listing) => (
        <li key={listing.id} className="rounded-lg border p-4">
          <p className="font-semibold">{listing.title}</p>
          <p className="text-muted-foreground text-sm">
            {listing.complex.neighborhood}
          </p>
        </li>
      ))}
    </ul>
  );
}
