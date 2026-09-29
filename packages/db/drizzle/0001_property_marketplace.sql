-- Generalize "complex" into a user-owned "property", add explicit listing
-- types, and give applications/stays the dates needed for lease bookings.
-- Existing complexes become ownerless "building" properties; existing rooms
-- stay "room" listings.

-- 1. complex -> property
ALTER TYPE "public"."complex_image_kind" RENAME TO "property_image_kind";--> statement-breakpoint
ALTER TABLE "complex" RENAME TO "property";--> statement-breakpoint
ALTER TABLE "property" RENAME CONSTRAINT "complex_pkey" TO "property_pkey";--> statement-breakpoint
ALTER TABLE "complex_image" RENAME TO "property_image";--> statement-breakpoint
ALTER TABLE "property_image" RENAME CONSTRAINT "complex_image_pkey" TO "property_image_pkey";--> statement-breakpoint
ALTER TABLE "property_image" RENAME COLUMN "complex_id" TO "property_id";--> statement-breakpoint
ALTER TABLE "property_image" RENAME CONSTRAINT "complex_image_complex_id_complex_id_fk" TO "property_image_property_id_property_id_fk";--> statement-breakpoint
ALTER TABLE "room" RENAME COLUMN "complex_id" TO "property_id";--> statement-breakpoint
ALTER TABLE "room" RENAME CONSTRAINT "room_complex_id_complex_id_fk" TO "room_property_id_property_id_fk";--> statement-breakpoint

-- 2. New enums
CREATE TYPE "public"."property_type" AS ENUM('house', 'apartment', 'condo', 'villa', 'building', 'hotel', 'other');--> statement-breakpoint
CREATE TYPE "public"."listing_type" AS ENUM('room', 'entire_property');--> statement-breakpoint
ALTER TYPE "public"."stay_status" ADD VALUE IF NOT EXISTS 'upcoming';--> statement-breakpoint
ALTER TYPE "public"."stay_status" ADD VALUE IF NOT EXISTS 'cancelled';--> statement-breakpoint

-- 3. Property ownership and type
ALTER TABLE "property" ADD COLUMN "owner_id" text;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "property_type" "property_type" DEFAULT 'building' NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "bedroom_count" integer;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "bathroom_count" real;--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

-- 4. Listing type
ALTER TABLE "room" ADD COLUMN "listing_type" "listing_type" DEFAULT 'room' NOT NULL;--> statement-breakpoint

-- 5. Lease dates on applications and stays
ALTER TABLE "application" ADD COLUMN "move_in_date" date;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "lease_months" integer;--> statement-breakpoint
ALTER TABLE "stay" ADD COLUMN "application_id" uuid;--> statement-breakpoint
ALTER TABLE "stay" ADD CONSTRAINT "stay_application_id_application_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."application"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint

-- 6. Backfill: every standalone room with a usable address gets its own
-- property owned by the room's host, so location lives on the property.
CREATE TEMP TABLE "standalone_room_property" AS
SELECT "id" AS "room_id", gen_random_uuid() AS "property_id"
FROM "room"
WHERE "property_id" IS NULL
  AND "city" IS NOT NULL
  AND "address_line1" IS NOT NULL;--> statement-breakpoint
INSERT INTO "property" (
  "id", "owner_id", "property_type", "title", "description",
  "address_line1", "address_line2", "city", "neighborhood", "postal_code",
  "country", "latitude", "longitude", "amenities", "pet_friendly", "created_at"
)
SELECT
  m."property_id", r."host_id", 'house', r."title", r."description",
  r."address_line1", r."address_line2", r."city", COALESCE(r."neighborhood", ''), r."postal_code",
  COALESCE(r."country", 'MX'), r."latitude", r."longitude", '{}', r."accepts_pets", r."created_at"
FROM "standalone_room_property" m
JOIN "room" r ON r."id" = m."room_id";--> statement-breakpoint
UPDATE "room" r
SET "property_id" = m."property_id"
FROM "standalone_room_property" m
WHERE r."id" = m."room_id";--> statement-breakpoint
DROP TABLE "standalone_room_property";
