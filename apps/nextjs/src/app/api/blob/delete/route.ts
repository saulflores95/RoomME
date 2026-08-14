import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

import { deleteBlobUrls, isVercelBlobUrl } from "@acme/api/blob";

import { auth } from "~/auth/server";
import { env } from "~/env";

const DeleteBodySchema = z.object({
  urls: z.array(z.url()).min(1).max(24),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Blob storage is not configured" },
      { status: 503 },
    );
  }

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = DeleteBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const urls = parsed.data.urls.filter(isVercelBlobUrl);
  if (urls.length === 0) {
    return NextResponse.json({ deleted: 0 });
  }

  try {
    await deleteBlobUrls(urls);
    return NextResponse.json({ deleted: urls.length });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete blobs";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
