"use client";

import { useCallback, useState } from "react";
import { useLocale } from "next-intl";

const FALLBACK_FILENAME = "ficha-tecnica.pdf";

export class TechnicalSheetDownloadError extends Error {
  constructor(public readonly status: number) {
    super(`Technical sheet download failed with status ${status}`);
    this.name = "TechnicalSheetDownloadError";
  }
}

const filenameFrom = (disposition: string | null): string =>
  /filename="([^"]+)"/.exec(disposition ?? "")?.[1] ?? FALLBACK_FILENAME;

const saveBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

export interface DownloadTechnicalSheet {
  download: () => Promise<void>;
  isDownloading: boolean;
}

export const useDownloadTechnicalSheet = (
  listingId: string,
  onError: (error: unknown) => void,
): DownloadTechnicalSheet => {
  const locale = useLocale();
  const [isDownloading, setIsDownloading] = useState(false);

  const download = useCallback(async (): Promise<void> => {
    setIsDownloading(true);
    try {
      const params = new URLSearchParams({ locale });
      const response = await fetch(
        `/api/listings/${listingId}/technical-sheet?${params.toString()}`,
      );
      if (!response.ok) {
        throw new TechnicalSheetDownloadError(response.status);
      }
      const blob = await response.blob();
      saveBlob(blob, filenameFrom(response.headers.get("Content-Disposition")));
    } catch (error) {
      console.error("Technical sheet download failed", { listingId, error });
      onError(error);
    } finally {
      setIsDownloading(false);
    }
  }, [listingId, locale, onError]);

  return { download, isDownloading };
};
