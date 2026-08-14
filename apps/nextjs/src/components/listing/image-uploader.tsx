"use client";

import type { JSX } from "react";
import { useId, useRef, useState } from "react";
import { Cross2Icon, UploadIcon } from "@radix-ui/react-icons";
import { upload } from "@vercel/blob/client";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@acme/ui/field";
import { toast } from "@acme/ui/toast";
import { MAX_LISTING_IMAGES } from "@acme/validators";

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/gif";
const MAX_FILE_BYTES = 8 * 1024 * 1024;

interface ImageUploaderProps {
  label: string;
  hint: string;
  value: string[];
  onChange: (urls: string[]) => void;
  invalid?: boolean;
  error?: { message?: string };
  dropLabel: string;
  browseLabel: string;
  removeLabel: string;
  uploadingLabel: string;
  maxReachedLabel: string;
  uploadFailedLabel: string;
}

const isAcceptedFile = (file: File): boolean =>
  file.type.startsWith("image/") && file.size <= MAX_FILE_BYTES;

const deleteBlobUrls = async (urls: readonly string[]): Promise<void> => {
  if (urls.length === 0) {
    return;
  }

  try {
    await fetch("/api/blob/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls }),
    });
  } catch {
    // Best-effort cleanup; save-time sync also deletes orphans.
  }
};

export function ImageUploader({
  label,
  hint,
  value,
  onChange,
  invalid = false,
  error,
  dropLabel,
  browseLabel,
  removeLabel,
  uploadingLabel,
  maxReachedLabel,
  uploadFailedLabel,
}: ImageUploaderProps): JSX.Element {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [sessionUploads, setSessionUploads] = useState<Set<string>>(
    () => new Set(),
  );

  const remaining = MAX_LISTING_IMAGES - value.length;
  const isUploading = uploadingCount > 0;

  const addFiles = async (fileList: FileList | File[]): Promise<void> => {
    const files = [...fileList].filter(isAcceptedFile);
    if (files.length === 0) {
      return;
    }

    if (remaining <= 0) {
      toast.error(maxReachedLabel);
      return;
    }

    const selected = files.slice(0, remaining);
    setUploadingCount((count) => count + selected.length);

    const uploaded: string[] = [];

    try {
      for (const file of selected) {
        try {
          const blob = await upload(`listings/${file.name}`, file, {
            access: "public",
            handleUploadUrl: "/api/blob/upload",
          });
          uploaded.push(blob.url);
        } catch {
          toast.error(uploadFailedLabel);
        }
      }

      if (uploaded.length > 0) {
        setSessionUploads((prev) => {
          const next = new Set(prev);
          for (const url of uploaded) {
            next.add(url);
          }
          return next;
        });
        onChange([...value, ...uploaded]);
      }
    } finally {
      setUploadingCount((count) => Math.max(0, count - selected.length));
    }
  };

  const removeAt = (index: number): void => {
    const url = value[index];
    if (!url) {
      return;
    }

    const next = value.filter((_, i) => i !== index);
    onChange(next);

    if (sessionUploads.has(url)) {
      setSessionUploads((prev) => {
        const updated = new Set(prev);
        updated.delete(url);
        return updated;
      });
      void deleteBlobUrls([url]);
    }
  };

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <FieldDescription>{hint}</FieldDescription>

      <div
        className={cn(
          "border-input bg-muted/20 mt-2 rounded-lg border border-dashed p-4 transition-colors",
          dragging && "border-primary bg-primary/5",
          invalid && "border-destructive",
        )}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          void addFiles(event.dataTransfer.files);
        }}
      >
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <UploadIcon className="text-muted-foreground size-6" />
          <p className="text-muted-foreground text-sm">{dropLabel}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploading || remaining <= 0}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? uploadingLabel : browseLabel}
          </Button>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={ACCEPTED_TYPES}
            multiple
            className="sr-only"
            disabled={isUploading || remaining <= 0}
            onChange={(event) => {
              const { files } = event.target;
              if (files) {
                void addFiles(files);
              }
              event.target.value = "";
            }}
          />
        </div>

        {value.length > 0 ? (
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {value.map((url, index) => (
              <li
                key={url}
                className="group bg-muted relative aspect-4/3 overflow-hidden rounded-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- remote blob URLs */}
                <img src={url} alt="" className="size-full object-cover" />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute top-1.5 right-1.5 size-7 opacity-90 shadow-sm"
                  aria-label={removeLabel}
                  onClick={() => removeAt(index)}
                >
                  <Cross2Icon className="size-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {invalid ? <FieldError errors={[error]} /> : null}
    </Field>
  );
}
