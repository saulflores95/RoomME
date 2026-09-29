import { adminRouter } from "./router/admin";
import { applicationRouter } from "./router/application";
import { authRouter } from "./router/auth";
import { bookingRouter } from "./router/booking";
import { listingRouter } from "./router/listing";
import { profileRouter } from "./router/profile";
import { ratingRouter } from "./router/rating";
import { tourRouter } from "./router/tour";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  admin: adminRouter,
  application: applicationRouter,
  auth: authRouter,
  booking: bookingRouter,
  listing: listingRouter,
  profile: profileRouter,
  rating: ratingRouter,
  tour: tourRouter,
});

export type AppRouter = typeof appRouter;
