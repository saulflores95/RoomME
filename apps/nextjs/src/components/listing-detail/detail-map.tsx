"use client";

import dynamic from "next/dynamic";

export const DetailMap = dynamic(
  async () => {
    const mod = await import("~/components/room-detail-map");
    return mod.RoomDetailMap;
  },
  {
    ssr: false,
    loading: () => <div className="bg-muted h-full w-full animate-pulse" />,
  },
);
