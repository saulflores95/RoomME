import { authRouter } from "./router/auth";
import { listingRouter } from "./router/listing";
import { ratingRouter } from "./router/rating";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  listing: listingRouter,
  rating: ratingRouter,
});

export type AppRouter = typeof appRouter;
