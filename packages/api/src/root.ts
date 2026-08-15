import { applicationRouter } from "./router/application";
import { authRouter } from "./router/auth";
import { listingRouter } from "./router/listing";
import { profileRouter } from "./router/profile";
import { ratingRouter } from "./router/rating";
import { tourRouter } from "./router/tour";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  application: applicationRouter,
  auth: authRouter,
  listing: listingRouter,
  profile: profileRouter,
  rating: ratingRouter,
  tour: tourRouter,
});

export type AppRouter = typeof appRouter;
