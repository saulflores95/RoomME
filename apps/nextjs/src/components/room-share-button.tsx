"use client";

import type { JSX } from "react";
import { useSyncExternalStore } from "react";
import { Share1Icon } from "@radix-ui/react-icons";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import { toast } from "@acme/ui/toast";

interface RoomShareButtonProps {
  listingId: string;
  title: string;
  description: string;
}

const subscribeNoop = (): (() => void) => () => undefined;

const canUseWebShare = (): boolean => {
  return (
    typeof navigator !== "undefined" && typeof navigator.share === "function"
  );
};

const canShareFiles = (): boolean => {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.canShare !== "function"
  ) {
    return false;
  }
  try {
    const file = new File(
      [new Blob(["x"], { type: "image/png" })],
      "share.png",
      { type: "image/png" },
    );
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
};

export function RoomShareButton({
  listingId,
  title,
  description,
}: RoomShareButtonProps): JSX.Element {
  const t = useTranslations("rooms");
  const locale = useLocale();
  const supportsShare = useSyncExternalStore(
    subscribeNoop,
    canUseWebShare,
    () => false,
  );
  const supportsFileShare = useSyncExternalStore(
    subscribeNoop,
    canShareFiles,
    () => false,
  );

  const sharePath = `/${locale}/rooms/${listingId}`;
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${sharePath}`
      : sharePath;
  const ogImageUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${sharePath}/opengraph-image`
      : `${sharePath}/opengraph-image`;
  const shareText = [title, description.trim().slice(0, 140)]
    .filter((part) => part.length > 0)
    .join("\n");

  const handleNativeShare = async (): Promise<void> => {
    try {
      await navigator.share({
        title,
        text: shareText,
        url: shareUrl,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      toast.error(t("shareFailed"));
    }
  };

  const handleCopyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success(t("copied"));
    } catch {
      toast.error(t("shareFailed"));
    }
  };

  const fetchShareImage = async (): Promise<Blob> => {
    const response = await fetch(ogImageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch share image");
    }
    return response.blob();
  };

  const handleDownloadImage = async (): Promise<void> => {
    try {
      const blob = await fetchShareImage();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `roomme-${listingId}.png`;
      anchor.click();
      URL.revokeObjectURL(objectUrl);
    } catch {
      toast.error(t("shareFailed"));
    }
  };

  const handleShareImage = async (): Promise<void> => {
    try {
      const blob = await fetchShareImage();
      const file = new File([blob], `roomme-${listingId}.png`, {
        type: "image/png",
      });
      if (canShareFiles()) {
        await navigator.share({
          title,
          text: shareText,
          files: [file],
        });
        return;
      }
      await handleDownloadImage();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      toast.error(t("shareFailed"));
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" type="button">
          <Share1Icon />
          {t("share")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        {supportsShare ? (
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              void handleNativeShare();
            }}
          >
            {t("shareNative")}
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem asChild>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            {t("shareWhatsApp")}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={facebookHref} target="_blank" rel="noopener noreferrer">
            {t("shareFacebook")}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            void handleCopyLink();
          }}
        >
          {t("copyLink")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {supportsFileShare ? (
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              void handleShareImage();
            }}
          >
            {t("shareImage")}
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            void handleDownloadImage();
          }}
        >
          {t("downloadImage")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
