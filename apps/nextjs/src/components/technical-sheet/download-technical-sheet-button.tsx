"use client";

import type { ComponentProps, JSX } from "react";
import { useCallback } from "react";
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import {
  TechnicalSheetDownloadError,
  useDownloadTechnicalSheet,
} from "./use-download-technical-sheet";

type ButtonProps = ComponentProps<typeof Button>;

export const DownloadTechnicalSheetButton = ({
  listingId,
  variant = "outline",
  size,
}: {
  listingId: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}): JSX.Element => {
  const t = useTranslations("technicalSheet");

  const handleError = useCallback(
    (error: unknown): void => {
      const forbidden =
        error instanceof TechnicalSheetDownloadError &&
        (error.status === 401 || error.status === 403);
      toast.error(forbidden ? t("downloadForbidden") : t("downloadFailed"));
    },
    [t],
  );

  const { download, isDownloading } = useDownloadTechnicalSheet(
    listingId,
    handleError,
  );

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={isDownloading}
      aria-busy={isDownloading}
      onClick={() => void download()}
    >
      {isDownloading ? (
        <ReloadIcon className="animate-spin" />
      ) : (
        <DownloadIcon />
      )}
      {isDownloading ? t("generating") : t("download")}
    </Button>
  );
};
