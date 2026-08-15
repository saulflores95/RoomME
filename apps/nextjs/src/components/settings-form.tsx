"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { upload } from "@vercel/blob/client";
import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { toast } from "@acme/ui/toast";

import { useTRPC } from "~/trpc/react";

const DAYS = [0, 1, 2, 3, 4, 5, 6] as const;

type MyProfile = RouterOutputs["profile"]["me"];
type WeeklyHour = RouterOutputs["tour"]["myWeeklyHours"][number];
type BlockedDate = RouterOutputs["tour"]["myBlockedDates"][number];

interface DayHours {
  start: string;
  end: string;
  enabled: boolean;
}

const minuteToInput = (minute: number): string => {
  const hours = String(Math.floor(minute / 60)).padStart(2, "0");
  const mins = String(minute % 60).padStart(2, "0");
  return `${hours}:${mins}`;
};

const inputToMinute = (value: string): number => {
  const [h, m] = value.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

const buildDayHours = (
  hours: WeeklyHour[] | undefined,
): Record<number, DayHours> => {
  const next: Record<number, DayHours> = {};
  for (const day of DAYS) {
    const match = hours?.find((row) => row.dayOfWeek === day);
    next[day] = match
      ? {
          enabled: true,
          start: minuteToInput(match.startMinute),
          end: minuteToInput(match.endMinute),
        }
      : { enabled: false, start: "10:00", end: "18:00" };
  }
  return next;
};

const splitList = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

export function SettingsForm(): JSX.Element {
  const trpc = useTRPC();
  const meQuery = useQuery(trpc.profile.me.queryOptions());
  const hoursQuery = useQuery({
    ...trpc.tour.myWeeklyHours.queryOptions(),
    enabled: meQuery.data?.isAgent === true,
  });
  const blockedQuery = useQuery({
    ...trpc.tour.myBlockedDates.queryOptions(),
    enabled: meQuery.data?.isAgent === true,
  });

  if (meQuery.isLoading || !meQuery.data) {
    return <div className="bg-muted h-64 animate-pulse rounded-2xl" />;
  }

  if (meQuery.data.isAgent && hoursQuery.isLoading) {
    return <div className="bg-muted h-64 animate-pulse rounded-2xl" />;
  }

  return (
    <SettingsFormLoaded
      profile={meQuery.data}
      initialHours={hoursQuery.data}
      blockedDates={blockedQuery.data ?? []}
    />
  );
}

function SettingsFormLoaded({
  profile,
  initialHours,
  blockedDates,
}: {
  profile: MyProfile;
  initialHours: WeeklyHour[] | undefined;
  blockedDates: BlockedDate[];
}): JSX.Element {
  const t = useTranslations("settings");
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio ?? "");
  const [birthDate, setBirthDate] = useState(
    profile.birthDate ? profile.birthDate.toISOString().slice(0, 10) : "",
  );
  const [image, setImage] = useState<string | null>(profile.image);
  const [documentUrl, setDocumentUrl] = useState<string | null>(
    profile.documentUrl,
  );
  const [hobbies, setHobbies] = useState(profile.hobbies.join(", "));
  const [personalities, setPersonalities] = useState(
    profile.personalities.join(", "),
  );
  const [hasPets, setHasPets] = useState(profile.hasPets);
  const [cities, setCities] = useState<string[]>(profile.operatingCities);
  const [dayHours, setDayHours] = useState(() => buildDayHours(initialHours));
  const [blockDate, setBlockDate] = useState("");

  const updateMutation = useMutation(
    trpc.profile.update.mutationOptions({
      onSuccess: async () => {
        toast.success(t("saved"));
        await queryClient.invalidateQueries(trpc.profile.me.queryFilter());
      },
      onError: () => toast.error(t("saveFailed")),
    }),
  );

  const hoursMutation = useMutation(
    trpc.tour.setWeeklyHours.mutationOptions({
      onSuccess: async () => {
        toast.success(t("hoursSaved"));
        await queryClient.invalidateQueries(
          trpc.tour.myWeeklyHours.queryFilter(),
        );
      },
      onError: () => toast.error(t("saveFailed")),
    }),
  );

  const addBlockMutation = useMutation(
    trpc.tour.addBlockedDate.mutationOptions({
      onSuccess: async () => {
        setBlockDate("");
        await queryClient.invalidateQueries(
          trpc.tour.myBlockedDates.queryFilter(),
        );
      },
    }),
  );

  const removeBlockMutation = useMutation(
    trpc.tour.removeBlockedDate.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.tour.myBlockedDates.queryFilter(),
        );
      },
    }),
  );

  const dayLabels = useMemo(
    () => [
      t("daySun"),
      t("dayMon"),
      t("dayTue"),
      t("dayWed"),
      t("dayThu"),
      t("dayFri"),
      t("daySat"),
    ],
    [t],
  );

  const uploadFile = async (
    file: File,
    kind: "avatar" | "document",
  ): Promise<void> => {
    try {
      const result = await upload(`profiles/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });
      if (kind === "avatar") {
        setImage(result.url);
      } else {
        setDocumentUrl(result.url);
      }
    } catch {
      toast.error(t("uploadFailed"));
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("subtitle")}</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{t("profileSection")}</h2>
        <label className="block space-y-1 text-sm">
          <span>{t("name")}</span>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span>{t("bio")}</span>
          <textarea
            className="border-input bg-background min-h-24 w-full rounded-md border px-3 py-2 text-sm"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span>{t("birthDate")}</span>
          <Input
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span>{t("hobbies")}</span>
          <Input
            value={hobbies}
            onChange={(event) => setHobbies(event.target.value)}
            placeholder={t("commaSeparated")}
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span>{t("personalities")}</span>
          <Input
            value={personalities}
            onChange={(event) => setPersonalities(event.target.value)}
            placeholder={t("commaSeparated")}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hasPets}
            onChange={(event) => setHasPets(event.target.checked)}
          />
          {t("hasPets")}
        </label>

        <div className="flex flex-wrap items-center gap-3">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              className="size-16 rounded-full object-cover"
            />
          ) : null}
          <label className="text-sm">
            <span className="mb-1 block">{t("avatar")}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadFile(file, "avatar");
              }}
            />
          </label>
        </div>

        <div className="space-y-1 text-sm">
          <span className="block">{t("document")}</span>
          {documentUrl ? (
            <p className="text-muted-foreground text-xs">
              {t("documentUploaded")}
            </p>
          ) : (
            <p className="text-muted-foreground text-xs">{t("documentHint")}</p>
          )}
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadFile(file, "document");
            }}
          />
        </div>

        <Button
          type="button"
          disabled={updateMutation.isPending}
          onClick={() =>
            updateMutation.mutate({
              name,
              bio: bio.length > 0 ? bio : null,
              birthDate: birthDate.length > 0 ? new Date(birthDate) : null,
              image,
              hobbies: splitList(hobbies),
              personalities: splitList(personalities),
              hasPets,
              documentUrl,
              operatingCities: cities.filter(
                (city): city is "queretaro" => city === "queretaro",
              ),
            })
          }
        >
          {t("saveProfile")}
        </Button>
      </section>

      {profile.isAgent ? (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">{t("agentSection")}</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              {(["queretaro"] as const).map((city) => (
                <label key={city} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={cities.includes(city)}
                    onChange={(event) => {
                      setCities((current) =>
                        event.target.checked
                          ? [...current, city]
                          : current.filter((item) => item !== city),
                      );
                    }}
                  />
                  {t("cityQueretaro")}
                </label>
              ))}
            </div>

            <div className="space-y-3">
              {DAYS.map((day) => {
                const row = dayHours[day];
                if (!row) return null;
                return (
                  <div
                    key={day}
                    className="flex flex-wrap items-center gap-2 text-sm"
                  >
                    <label className="flex w-28 items-center gap-2">
                      <input
                        type="checkbox"
                        checked={row.enabled}
                        onChange={(event) =>
                          setDayHours((current) => ({
                            ...current,
                            [day]: {
                              ...row,
                              enabled: event.target.checked,
                            },
                          }))
                        }
                      />
                      {dayLabels[day]}
                    </label>
                    <Input
                      type="time"
                      className="w-32"
                      disabled={!row.enabled}
                      value={row.start}
                      onChange={(event) =>
                        setDayHours((current) => ({
                          ...current,
                          [day]: { ...row, start: event.target.value },
                        }))
                      }
                    />
                    <span>–</span>
                    <Input
                      type="time"
                      className="w-32"
                      disabled={!row.enabled}
                      value={row.end}
                      onChange={(event) =>
                        setDayHours((current) => ({
                          ...current,
                          [day]: { ...row, end: event.target.value },
                        }))
                      }
                    />
                  </div>
                );
              })}
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={hoursMutation.isPending}
              onClick={() => {
                const hours = DAYS.flatMap((day) => {
                  const row = dayHours[day];
                  if (!row?.enabled) return [];
                  return [
                    {
                      dayOfWeek: day,
                      startMinute: inputToMinute(row.start),
                      endMinute: inputToMinute(row.end),
                    },
                  ];
                });
                hoursMutation.mutate({ hours });
                updateMutation.mutate({
                  operatingCities: cities.filter(
                    (city): city is "queretaro" => city === "queretaro",
                  ),
                });
              }}
            >
              {t("saveAvailability")}
            </Button>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">{t("blockedSection")}</h2>
            <div className="flex flex-wrap gap-2">
              <Input
                type="date"
                className="w-44"
                value={blockDate}
                onChange={(event) => setBlockDate(event.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                disabled={blockDate.length === 0 || addBlockMutation.isPending}
                onClick={() =>
                  addBlockMutation.mutate({ date: new Date(blockDate) })
                }
              >
                {t("addBlocked")}
              </Button>
            </div>
            <ul className="space-y-2 text-sm">
              {blockedDates.map((row) => (
                <li
                  key={row.id}
                  className="flex items-center justify-between gap-2"
                >
                  <span>{row.date.toISOString().slice(0, 10)}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeBlockMutation.mutate({ id: row.id })}
                  >
                    {t("remove")}
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}
    </div>
  );
}
