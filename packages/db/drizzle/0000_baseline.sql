CREATE TYPE "public"."application_status" AS ENUM('pending', 'accepted', 'declined', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."bathroom_type" AS ENUM('private', 'shared');--> statement-breakpoint
CREATE TYPE "public"."city" AS ENUM('queretaro');--> statement-breakpoint
CREATE TYPE "public"."cleanliness" AS ENUM('relaxed', 'average', 'tidy');--> statement-breakpoint
CREATE TYPE "public"."complex_image_kind" AS ENUM('exterior', 'common', 'other');--> statement-breakpoint
CREATE TYPE "public"."furnished" AS ENUM('furnished', 'semi', 'unfurnished');--> statement-breakpoint
CREATE TYPE "public"."household_gender" AS ENUM('male', 'female', 'mixed');--> statement-breakpoint
CREATE TYPE "public"."overnight_guests" AS ENUM('no', 'ask', 'yes');--> statement-breakpoint
CREATE TYPE "public"."room_image_kind" AS ENUM('room', 'apartment');--> statement-breakpoint
CREATE TYPE "public"."room_status" AS ENUM('draft', 'listed', 'occupied', 'unlisted');--> statement-breakpoint
CREATE TYPE "public"."smoking_policy" AS ENUM('no', 'outdoor', 'yes');--> statement-breakpoint
CREATE TYPE "public"."stay_status" AS ENUM('current', 'past');--> statement-breakpoint
CREATE TYPE "public"."tour_booking_status" AS ENUM('scheduled', 'cancelled', 'completed');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"bio" text,
	"birth_date" timestamp,
	"hobbies" text[] DEFAULT '{}' NOT NULL,
	"personalities" text[] DEFAULT '{}' NOT NULL,
	"has_pets" boolean DEFAULT false NOT NULL,
	"pet_type" text,
	"pet_size" text,
	"document_url" text,
	"operating_cities" text[] DEFAULT '{}' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"role" text DEFAULT 'roomie',
	"agent_approved" boolean DEFAULT false NOT NULL,
	"banned" boolean DEFAULT false,
	"ban_reason" text,
	"ban_expires" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agent_blocked_date" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agent_id" text NOT NULL,
	"date" date NOT NULL,
	"note" varchar(256),
	CONSTRAINT "agent_blocked_date_unique" UNIQUE("agent_id","date")
);
--> statement-breakpoint
CREATE TABLE "agent_weekly_hours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agent_id" text NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_minute" integer NOT NULL,
	"end_minute" integer NOT NULL,
	CONSTRAINT "agent_weekly_hours_unique" UNIQUE("agent_id","day_of_week","start_minute")
);
--> statement-breakpoint
CREATE TABLE "application" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_id" uuid NOT NULL,
	"applicant_id" text NOT NULL,
	"message" text,
	"status" "application_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "application_room_applicant" UNIQUE("room_id","applicant_id")
);
--> statement-breakpoint
CREATE TABLE "complex" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"address_line1" varchar(256) NOT NULL,
	"address_line2" varchar(256),
	"city" "city" NOT NULL,
	"neighborhood" varchar(128) NOT NULL,
	"postal_code" varchar(16),
	"country" varchar(64) DEFAULT 'MX' NOT NULL,
	"latitude" double precision,
	"longitude" double precision,
	"amenities" text[] DEFAULT '{}' NOT NULL,
	"pet_friendly" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "complex_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"complex_id" uuid NOT NULL,
	"url" text NOT NULL,
	"alt" varchar(256),
	"sort_order" integer DEFAULT 0 NOT NULL,
	"kind" "complex_image_kind" DEFAULT 'other' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "room" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"host_id" text,
	"complex_id" uuid,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"address_line1" varchar(256),
	"address_line2" varchar(256),
	"city" "city",
	"neighborhood" varchar(128),
	"postal_code" varchar(16),
	"country" varchar(64) DEFAULT 'MX',
	"latitude" double precision,
	"longitude" double precision,
	"rent_price_cents" integer NOT NULL,
	"currency" varchar(8) DEFAULT 'MXN' NOT NULL,
	"includes" text[] DEFAULT '{}' NOT NULL,
	"capacity" integer DEFAULT 1 NOT NULL,
	"household_gender" "household_gender" DEFAULT 'mixed' NOT NULL,
	"preferred_age_min" integer DEFAULT 18 NOT NULL,
	"preferred_age_max" integer DEFAULT 99 NOT NULL,
	"has_pets" boolean DEFAULT false NOT NULL,
	"accepts_pets" boolean DEFAULT false NOT NULL,
	"bathroom_type" "bathroom_type" DEFAULT 'shared' NOT NULL,
	"furnished" "furnished" DEFAULT 'furnished' NOT NULL,
	"deposit_months" integer DEFAULT 1 NOT NULL,
	"lease_months" integer DEFAULT 12 NOT NULL,
	"couples_allowed" boolean DEFAULT false NOT NULL,
	"smoking_policy" "smoking_policy" DEFAULT 'no' NOT NULL,
	"overnight_guests" "overnight_guests" DEFAULT 'ask' NOT NULL,
	"wfh_friendly" boolean DEFAULT false NOT NULL,
	"quiet_home" boolean DEFAULT false NOT NULL,
	"cleanliness" "cleanliness" DEFAULT 'average' NOT NULL,
	"available_from" timestamp with time zone,
	"status" "room_status" DEFAULT 'listed' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "room_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_id" uuid NOT NULL,
	"url" text NOT NULL,
	"alt" varchar(256),
	"sort_order" integer DEFAULT 0 NOT NULL,
	"kind" "room_image_kind" DEFAULT 'room' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roomme_rating" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rater_id" text NOT NULL,
	"ratee_id" text NOT NULL,
	"stay_id" uuid NOT NULL,
	"score" integer NOT NULL,
	"comment" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "roomme_rating_rater_ratee_stay" UNIQUE("rater_id","ratee_id","stay_id")
);
--> statement-breakpoint
CREATE TABLE "stay" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"ended_at" timestamp with time zone,
	"status" "stay_status" DEFAULT 'current' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tour_booking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_id" uuid NOT NULL,
	"agent_id" text NOT NULL,
	"seeker_id" text NOT NULL,
	"starts_at" timestamp with time zone NOT NULL,
	"ends_at" timestamp with time zone NOT NULL,
	"status" "tour_booking_status" DEFAULT 'scheduled' NOT NULL,
	"rescheduled_from_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agent_blocked_date" ADD CONSTRAINT "agent_blocked_date_agent_id_user_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agent_weekly_hours" ADD CONSTRAINT "agent_weekly_hours_agent_id_user_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application" ADD CONSTRAINT "application_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application" ADD CONSTRAINT "application_applicant_id_user_id_fk" FOREIGN KEY ("applicant_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "complex_image" ADD CONSTRAINT "complex_image_complex_id_complex_id_fk" FOREIGN KEY ("complex_id") REFERENCES "public"."complex"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room" ADD CONSTRAINT "room_host_id_user_id_fk" FOREIGN KEY ("host_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room" ADD CONSTRAINT "room_complex_id_complex_id_fk" FOREIGN KEY ("complex_id") REFERENCES "public"."complex"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room_image" ADD CONSTRAINT "room_image_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomme_rating" ADD CONSTRAINT "roomme_rating_rater_id_user_id_fk" FOREIGN KEY ("rater_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomme_rating" ADD CONSTRAINT "roomme_rating_ratee_id_user_id_fk" FOREIGN KEY ("ratee_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomme_rating" ADD CONSTRAINT "roomme_rating_stay_id_stay_id_fk" FOREIGN KEY ("stay_id") REFERENCES "public"."stay"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stay" ADD CONSTRAINT "stay_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stay" ADD CONSTRAINT "stay_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_booking" ADD CONSTRAINT "tour_booking_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_booking" ADD CONSTRAINT "tour_booking_agent_id_user_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_booking" ADD CONSTRAINT "tour_booking_seeker_id_user_id_fk" FOREIGN KEY ("seeker_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "tour_booking_agent_starts_scheduled_uidx" ON "tour_booking" USING btree ("agent_id","starts_at") WHERE "tour_booking"."status" = 'scheduled';