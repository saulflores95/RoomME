import type { NextRequest } from "next/server";
import { TRPCError } from "@trpc/server";

import type { Locale } from "@acme/i18n";
import { appRouter, createTRPCContext } from "@acme/api";
import { defaultLocale, locales } from "@acme/i18n";

import { auth } from "~/auth/server";
import {
  renderTechnicalSheet,
  technicalSheetFilename,
} from "~/lib/technical-sheet/render";
import { referenceCode } from "~/lib/technical-sheet/sheet-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const isLocale = (value: string | null): value is Locale =>
  value !== null && (locales as readonly string[]).includes(value);

const TRPC_STATUS: Partial<Record<TRPCError["code"], number>> = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  BAD_REQUEST: 404,
};

const errorResponse = (status: number, message: string): Response =>
  Response.json({ error: message }, { status });

export const GET = async (
  request: NextRequest,
  { params }: RouteParams,
): Promise<Response> => {
  const { id } = await params;
  const localeParam = request.nextUrl.searchParams.get("locale");
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;

  try {
    const ctx = await createTRPCContext({ headers: request.headers, auth });
    const caller = appRouter.createCaller(ctx);
    const listing = await caller.listing.technicalSheet({ id });

    const listingUrl = `${request.nextUrl.origin}/${locale}/rooms/${listing.id}`;
    const pdf = await renderTechnicalSheet({ listing, locale, listingUrl });
    const filename = technicalSheetFilename(
      listing.title,
      referenceCode(listing.id),
    );

    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) {
      const status = TRPC_STATUS[error.code];
      if (status) {
        return errorResponse(status, error.code);
      }
    }
    console.error("Failed to generate technical sheet", { id, locale, error });
    return errorResponse(500, "INTERNAL_SERVER_ERROR");
  }
};
