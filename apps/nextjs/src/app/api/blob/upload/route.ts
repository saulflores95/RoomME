import type { HandleUploadBody } from "@vercel/blob/client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";

import { auth } from "~/auth/server";
import { env } from "~/env";

const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
] as const;

const MAX_SIZE_BYTES = 8 * 1024 * 1024;

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Blob storage is not configured" },
      { status: 503 },
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      token: env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async () => {
        const session = await auth.api.getSession({
          headers: request.headers,
        });

        if (!session?.user) {
          throw new Error("Not authenticated");
        }

        return {
          allowedContentTypes: [...ALLOWED_CONTENT_TYPES],
          maximumSizeInBytes: MAX_SIZE_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ userId: session.user.id }),
        };
      },
      onUploadCompleted: async () => {
        // URLs are persisted when the listing/complex form is saved.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload token failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
