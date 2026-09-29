-- Sale listings: rooms get an operation type (rent or sale) and the price
-- column is generalized and widened so sale prices fit in cents.
CREATE TYPE "public"."operation_type" AS ENUM('rent', 'sale');--> statement-breakpoint
ALTER TABLE "room" RENAME COLUMN "rent_price_cents" TO "price_cents";--> statement-breakpoint
ALTER TABLE "room" ALTER COLUMN "price_cents" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "room" ADD COLUMN "operation_type" "operation_type" DEFAULT 'rent' NOT NULL;
