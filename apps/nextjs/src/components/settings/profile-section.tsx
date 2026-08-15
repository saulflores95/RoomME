"use client";

import type { JSX } from "react";
import { useId, useRef, useState } from "react";
import { CheckCircledIcon, UploadIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

import type { PetSize, PetType } from "@acme/validators";
import { Button } from "@acme/ui/button";
import { Checkbox } from "@acme/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@acme/ui/field";
import { Input } from "@acme/ui/input";
import { Textarea } from "@acme/ui/textarea";
import {
  PET_SIZES,
  PET_TYPES,
  PROFILE_HOBBIES,
  PROFILE_PERSONALITIES,
} from "@acme/validators";

import { checkboxRowClassName } from "~/components/listing/form-controls";
import { AvatarCropDialog } from "./avatar-crop-dialog";
import { SettingsSectionCard } from "./section-card";
import { pillClassName, TagPills } from "./tag-pills";

export function SettingsProfileSection({
  name,
  bio,
  birthDate,
  image,
  documentUrl,
  hobbies,
  personalities,
  hasPets,
  petType,
  petSize,
  saving,
  onNameChange,
  onBioChange,
  onBirthDateChange,
  onHobbiesChange,
  onPersonalitiesChange,
  onHasPetsChange,
  onPetTypeChange,
  onPetSizeChange,
  onUpload,
  onSave,
}: {
  name: string;
  bio: string;
  birthDate: string;
  image: string | null;
  documentUrl: string | null;
  hobbies: string[];
  personalities: string[];
  hasPets: boolean;
  petType: PetType | null;
  petSize: PetSize | null;
  saving: boolean;
  onNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onBirthDateChange: (value: string) => void;
  onHobbiesChange: (value: string[]) => void;
  onPersonalitiesChange: (value: string[]) => void;
  onHasPetsChange: (value: boolean) => void;
  onPetTypeChange: (value: PetType) => void;
  onPetSizeChange: (value: PetSize) => void;
  onUpload: (file: File, kind: "avatar" | "document") => Promise<void>;
  onSave: () => void;
}): JSX.Element {
  const t = useTranslations("settings");
  const tags = useTranslations("tags");
  const avatarId = useId();
  const documentId = useId();
  const avatarRef = useRef<HTMLInputElement>(null);
  const documentRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<"avatar" | "document" | null>(
    null,
  );
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropFileName, setCropFileName] = useState("avatar.jpg");

  const closeCropper = (): void => {
    if (cropSrc) {
      URL.revokeObjectURL(cropSrc);
    }
    setCropSrc(null);
  };

  const openCropper = (file: File): void => {
    if (cropSrc) {
      URL.revokeObjectURL(cropSrc);
    }
    setCropFileName(file.name);
    setCropSrc(URL.createObjectURL(file));
  };

  const handleUpload = async (
    file: File | undefined,
    kind: "avatar" | "document",
  ): Promise<boolean> => {
    if (!file) {
      return false;
    }
    setUploading(kind);
    try {
      await onUpload(file, kind);
      return true;
    } catch {
      return false;
    } finally {
      setUploading(null);
    }
  };

  const initial = name.trim().slice(0, 1).toUpperCase() || "?";

  return (
    <SettingsSectionCard
      title={t("profileSection")}
      description={t("profileSectionHint")}
      footer={
        <Button type="button" disabled={saving} onClick={onSave}>
          {t("saveProfile")}
        </Button>
      }
    >
      <div className="flex items-center gap-4">
        <div className="bg-muted ring-border relative size-20 shrink-0 overflow-hidden rounded-full ring-1">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote blob URLs
            <img src={image} alt="" className="size-full object-cover" />
          ) : (
            <span className="text-muted-foreground flex size-full items-center justify-center text-2xl font-semibold">
              {initial}
            </span>
          )}
        </div>
        <div className="min-w-0 space-y-1.5">
          <p className="text-sm font-medium">{t("avatar")}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading === "avatar"}
            onClick={() => avatarRef.current?.click()}
          >
            {uploading === "avatar"
              ? t("uploading")
              : image
                ? t("changePhoto")
                : t("uploadPhoto")}
          </Button>
          <input
            ref={avatarRef}
            id={avatarId}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) {
                openCropper(file);
              }
            }}
          />
        </div>
      </div>

      <AvatarCropDialog
        imageSrc={cropSrc}
        fileName={cropFileName}
        open={cropSrc !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeCropper();
          }
        }}
        onConfirm={async (file) => handleUpload(file, "avatar")}
      />

      <FieldGroup className="gap-5">
        <Field>
          <FieldLabel htmlFor="settings-name">{t("name")}</FieldLabel>
          <Input
            id="settings-name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="settings-bio">{t("bio")}</FieldLabel>
          <Textarea
            id="settings-bio"
            className="min-h-28"
            value={bio}
            onChange={(event) => onBioChange(event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="settings-birth-date">
            {t("birthDate")}
          </FieldLabel>
          <Input
            id="settings-birth-date"
            type="date"
            value={birthDate}
            onChange={(event) => onBirthDateChange(event.target.value)}
          />
        </Field>

        <TagPills
          label={t("hobbies")}
          hint={t("tagCustomHint")}
          presets={PROFILE_HOBBIES}
          value={hobbies}
          onChange={onHobbiesChange}
          namespace="hobby"
        />

        <TagPills
          label={t("personalities")}
          hint={t("tagCustomHint")}
          presets={PROFILE_PERSONALITIES}
          value={personalities}
          onChange={onPersonalitiesChange}
          namespace="personality"
        />

        <Field orientation="horizontal" className={checkboxRowClassName}>
          <Checkbox
            id="settings-has-pets"
            checked={hasPets}
            onCheckedChange={(checked) => onHasPetsChange(checked === true)}
          />
          <FieldLabel htmlFor="settings-has-pets" className="font-normal">
            {t("hasPets")}
          </FieldLabel>
        </Field>

        {hasPets ? (
          <Field>
            <FieldLabel>{t("petType")}</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {PET_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={petType === type}
                  className={pillClassName(petType === type)}
                  onClick={() => {
                    onPetTypeChange(type);
                  }}
                >
                  {tags(`petType.${type}`)}
                </button>
              ))}
            </div>
          </Field>
        ) : null}

        {hasPets && petType === "dog" ? (
          <Field>
            <FieldLabel>{t("petSize")}</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {PET_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={petSize === size}
                  className={pillClassName(petSize === size)}
                  onClick={() => {
                    onPetSizeChange(size);
                  }}
                >
                  {tags(`petSize.${size}`)}
                </button>
              ))}
            </div>
          </Field>
        ) : null}

        <Field>
          <FieldLabel htmlFor={documentId}>{t("document")}</FieldLabel>
          <FieldDescription>
            {documentUrl ? t("documentUploaded") : t("documentHint")}
          </FieldDescription>
          <div className="border-input bg-muted/20 mt-1 rounded-lg border border-dashed p-4">
            <div className="flex flex-col items-center gap-2 py-2 text-center">
              {documentUrl ? (
                <CheckCircledIcon className="text-brand size-6" />
              ) : (
                <UploadIcon className="text-muted-foreground size-6" />
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading === "document"}
                onClick={() => documentRef.current?.click()}
              >
                {uploading === "document"
                  ? t("uploading")
                  : documentUrl
                    ? t("replaceDocument")
                    : t("browse")}
              </Button>
              <input
                ref={documentRef}
                id={documentId}
                type="file"
                accept="image/*,application/pdf"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  void handleUpload(file, "document");
                }}
              />
            </div>
          </div>
        </Field>
      </FieldGroup>
    </SettingsSectionCard>
  );
}
