import { del } from "@vercel/blob";

const VERCEL_BLOB_HOST = /\.blob\.vercel-storage\.com$/i;

export const isVercelBlobUrl = (url: string): boolean => {
  try {
    const { hostname } = new URL(url);
    return VERCEL_BLOB_HOST.test(hostname);
  } catch {
    return false;
  }
};

export const deleteBlobUrls = async (
  urls: readonly string[],
): Promise<void> => {
  const blobUrls = [...new Set(urls.filter(isVercelBlobUrl))];
  if (blobUrls.length === 0) {
    return;
  }

  const token =
    process.env.BLOB_READ_WRITE_TOKEN ??
    process.env.ROOMME_BLOB_READ_WRITE_TOKEN;
  const tokenOption =
    token !== undefined && token.length > 0 ? { token } : undefined;

  try {
    await del(blobUrls, tokenOption);
  } catch {
    // Ignore missing / already-deleted blobs so save/remove stays resilient.
  }
};
