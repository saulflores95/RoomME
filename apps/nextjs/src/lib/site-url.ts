import { env } from "~/env";

export const getSiteUrl = (): string => {
  if (env.VERCEL_PROJECT_PRODUCTION_URL != null) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
};
