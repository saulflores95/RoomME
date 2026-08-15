"use client";

import type { JSX } from "react";
import type { Area, Point } from "react-easy-crop";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Cropper from "react-easy-crop";

import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@acme/ui/dialog";
import { Slider } from "@acme/ui/slider";
import { toast } from "@acme/ui/toast";

import { cropImageToFile } from "~/lib/crop-image";

export function AvatarCropDialog({
  imageSrc,
  fileName,
  open,
  onOpenChange,
  onConfirm,
}: {
  imageSrc: string | null;
  fileName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (file: File) => Promise<boolean>;
}): JSX.Element {
  const t = useTranslations("settings");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }, [imageSrc]);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async (): Promise<void> => {
    if (!imageSrc || !croppedAreaPixels) {
      return;
    }
    setApplying(true);
    try {
      const file = await cropImageToFile(imageSrc, croppedAreaPixels, fileName);
      const uploaded = await onConfirm(file);
      if (uploaded) {
        onOpenChange(false);
      }
    } catch {
      toast.error(t("cropFailed"));
    } finally {
      setApplying(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (applying && !next) {
          return;
        }
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-md" showCloseButton={!applying}>
        <DialogHeader>
          <DialogTitle>{t("cropTitle")}</DialogTitle>
          <DialogDescription>{t("cropHint")}</DialogDescription>
        </DialogHeader>
        <div className="relative h-72 w-full bg-black">
          {imageSrc ? (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              minZoom={1}
              maxZoom={3}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          ) : null}
        </div>
        <div className="flex items-center gap-3 px-5 py-3">
          <span className="text-muted-foreground w-12 shrink-0 text-xs">
            {t("cropZoom")}
          </span>
          <Slider
            min={1}
            max={3}
            step={0.05}
            value={[zoom]}
            onValueChange={(value) => {
              const next = value[0];
              if (typeof next === "number") {
                setZoom(next);
              }
            }}
          />
        </div>
        <DialogFooter className="justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={applying}
            onClick={() => {
              onOpenChange(false);
            }}
          >
            {t("cropCancel")}
          </Button>
          <Button
            type="button"
            disabled={applying || !croppedAreaPixels}
            onClick={() => {
              void handleConfirm();
            }}
          >
            {applying ? t("uploading") : t("cropApply")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
