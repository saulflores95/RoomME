"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { upload } from "@vercel/blob/client";
import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import type { PetSize, PetType } from "@acme/validators";
import { toast } from "@acme/ui/toast";
import { PET_SIZES, PET_TYPES } from "@acme/validators";

import type { DayHours } from "~/components/settings/agent-section";
import {
  SETTINGS_DAYS,
  SettingsAgentSection,
} from "~/components/settings/agent-section";
import { SettingsBlockedDatesSection } from "~/components/settings/blocked-dates-section";
import { SettingsProfileSection } from "~/components/settings/profile-section";
import { useTRPC } from "~/trpc/react";

type MyProfile = RouterOutputs["profile"]["me"];
type WeeklyHour = RouterOutputs["tour"]["myWeeklyHours"][number];
type BlockedDate = RouterOutputs["tour"]["myBlockedDates"][number];

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
  for (const day of SETTINGS_DAYS) {
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

const parsePetType = (value: string | null): PetType | null =>
  PET_TYPES.some((item) => item === value) ? (value as PetType) : null;

const parsePetSize = (value: string | null): PetSize | null =>
  PET_SIZES.some((item) => item === value) ? (value as PetSize) : null;

const queretaroCities = (cities: string[]): "queretaro"[] =>
  cities.filter((city): city is "queretaro" => city === "queretaro");

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
    return <SettingsFormSkeleton />;
  }

  if (meQuery.data.isAgent && hoursQuery.isLoading) {
    return <SettingsFormSkeleton />;
  }

  return (
    <SettingsFormLoaded
      profile={meQuery.data}
      initialHours={hoursQuery.data}
      blockedDates={blockedQuery.data ?? []}
    />
  );
}

function SettingsFormSkeleton(): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="bg-muted h-72 animate-pulse rounded-2xl" />
      <div className="bg-muted h-56 animate-pulse rounded-2xl" />
    </div>
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
  const [hobbies, setHobbies] = useState(profile.hobbies);
  const [personalities, setPersonalities] = useState(profile.personalities);
  const [hasPets, setHasPets] = useState(profile.hasPets);
  const [petType, setPetType] = useState<PetType | null>(
    parsePetType(profile.petType),
  );
  const [petSize, setPetSize] = useState<PetSize | null>(
    parsePetSize(profile.petSize),
  );
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
    } catch (error) {
      toast.error(t("uploadFailed"));
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <SettingsProfileSection
        name={name}
        bio={bio}
        birthDate={birthDate}
        image={image}
        documentUrl={documentUrl}
        hobbies={hobbies}
        personalities={personalities}
        hasPets={hasPets}
        petType={petType}
        petSize={petSize}
        saving={updateMutation.isPending}
        onNameChange={setName}
        onBioChange={setBio}
        onBirthDateChange={setBirthDate}
        onHobbiesChange={setHobbies}
        onPersonalitiesChange={setPersonalities}
        onHasPetsChange={(next) => {
          setHasPets(next);
          if (!next) {
            setPetType(null);
            setPetSize(null);
          }
        }}
        onPetTypeChange={(next) => {
          setPetType(next);
          if (next !== "dog") {
            setPetSize(null);
          }
        }}
        onPetSizeChange={setPetSize}
        onUpload={uploadFile}
        onSave={() => {
          if (hasPets && petType == null) {
            toast.error(t("petTypeRequired"));
            return;
          }
          if (hasPets && petType === "dog" && petSize == null) {
            toast.error(t("petSizeRequired"));
            return;
          }
          updateMutation.mutate({
            name,
            bio: bio.length > 0 ? bio : null,
            birthDate: birthDate.length > 0 ? new Date(birthDate) : null,
            image,
            hobbies,
            personalities,
            hasPets,
            petType: hasPets ? petType : null,
            petSize: hasPets && petType === "dog" ? petSize : null,
            documentUrl,
            operatingCities: queretaroCities(cities),
          });
        }}
      />

      {profile.isAgent ? (
        <>
          <SettingsAgentSection
            cities={cities}
            dayHours={dayHours}
            dayLabels={dayLabels}
            saving={hoursMutation.isPending || updateMutation.isPending}
            onCitiesChange={setCities}
            onDayHoursChange={setDayHours}
            onSave={() => {
              const hours = SETTINGS_DAYS.flatMap((day) => {
                const row = dayHours[day];
                if (!row?.enabled) {
                  return [];
                }
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
                operatingCities: queretaroCities(cities),
              });
            }}
          />

          <SettingsBlockedDatesSection
            blockedDates={blockedDates}
            blockDate={blockDate}
            adding={addBlockMutation.isPending}
            onBlockDateChange={setBlockDate}
            onAdd={() => addBlockMutation.mutate({ date: blockDate })}
            onRemove={(id) => removeBlockMutation.mutate({ id })}
          />
        </>
      ) : null}
    </div>
  );
}
