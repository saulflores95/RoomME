import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, unique, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

import { user } from "./auth-schema";

export const cityEnum = pgEnum("city", ["queretaro"]);
export const roomStatusEnum = pgEnum("room_status", [
  "draft",
  "listed",
  "occupied",
  "unlisted",
]);
export const propertyImageKindEnum = pgEnum("property_image_kind", [
  "exterior",
  "common",
  "other",
]);
export const propertyTypeEnum = pgEnum("property_type", [
  "house",
  "apartment",
  "condo",
  "villa",
  "building",
  "hotel",
  "other",
]);
export const listingTypeEnum = pgEnum("listing_type", [
  "room",
  "entire_property",
]);
export const operationTypeEnum = pgEnum("operation_type", ["rent", "sale"]);
export const roomImageKindEnum = pgEnum("room_image_kind", [
  "room",
  "apartment",
]);
export const stayStatusEnum = pgEnum("stay_status", [
  "current",
  "past",
  "upcoming",
  "cancelled",
]);
export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "accepted",
  "declined",
  "withdrawn",
]);
export const householdGenderEnum = pgEnum("household_gender", [
  "male",
  "female",
  "mixed",
]);
export const bathroomTypeEnum = pgEnum("bathroom_type", ["private", "shared"]);
export const furnishedEnum = pgEnum("furnished", [
  "furnished",
  "semi",
  "unfurnished",
]);
export const smokingPolicyEnum = pgEnum("smoking_policy", [
  "no",
  "outdoor",
  "yes",
]);
export const overnightGuestsEnum = pgEnum("overnight_guests", [
  "no",
  "ask",
  "yes",
]);
export const cleanlinessEnum = pgEnum("cleanliness", [
  "relaxed",
  "average",
  "tidy",
]);
export const tourBookingStatusEnum = pgEnum("tour_booking_status", [
  "scheduled",
  "cancelled",
  "completed",
]);

export const Property = pgTable("property", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  /** Null for legacy platform-managed shared buildings. */
  ownerId: t.text().references(() => user.id, { onDelete: "cascade" }),
  propertyType: propertyTypeEnum().notNull().default("building"),
  bedroomCount: t.integer(),
  bathroomCount: t.real(),
  title: t.varchar({ length: 256 }).notNull(),
  description: t.text().notNull(),
  addressLine1: t.varchar({ length: 256 }).notNull(),
  addressLine2: t.varchar({ length: 256 }),
  city: cityEnum().notNull(),
  neighborhood: t.varchar({ length: 128 }).notNull(),
  postalCode: t.varchar({ length: 16 }),
  country: t.varchar({ length: 64 }).notNull().default("MX"),
  latitude: t.doublePrecision(),
  longitude: t.doublePrecision(),
  amenities: t.text().array().notNull().default([]),
  petFriendly: t.boolean().notNull().default(false),
  createdAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const PropertyImage = pgTable("property_image", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  propertyId: t
    .uuid()
    .notNull()
    .references(() => Property.id, { onDelete: "cascade" }),
  url: t.text().notNull(),
  alt: t.varchar({ length: 256 }),
  sortOrder: t.integer().notNull().default(0),
  kind: propertyImageKindEnum().notNull().default("other"),
}));

/**
 * A bookable listing. Either a private room inside a property or the entire
 * property (see `listingType`). Room-only columns are ignored for
 * `entire_property` listings.
 */
export const Room = pgTable("room", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  hostId: t.text().references(() => user.id, { onDelete: "cascade" }),
  propertyId: t.uuid().references(() => Property.id, { onDelete: "cascade" }),
  listingType: listingTypeEnum().notNull().default("room"),
  /** Only `entire_property` listings may be `sale`. */
  operationType: operationTypeEnum().notNull().default("rent"),
  title: t.varchar({ length: 256 }).notNull(),
  description: t.text().notNull(),
  addressLine1: t.varchar({ length: 256 }),
  addressLine2: t.varchar({ length: 256 }),
  city: cityEnum(),
  neighborhood: t.varchar({ length: 128 }),
  postalCode: t.varchar({ length: 16 }),
  country: t.varchar({ length: 64 }).default("MX"),
  latitude: t.doublePrecision(),
  longitude: t.doublePrecision(),
  /** Monthly rent for `rent` listings, total asking price for `sale`. */
  priceCents: t.bigint({ mode: "number" }).notNull(),
  currency: t.varchar({ length: 8 }).notNull().default("MXN"),
  includes: t.text().array().notNull().default([]),
  capacity: t.integer().notNull().default(1),
  householdGender: householdGenderEnum().notNull().default("mixed"),
  preferredAgeMin: t.integer().notNull().default(18),
  preferredAgeMax: t.integer().notNull().default(99),
  hasPets: t.boolean().notNull().default(false),
  acceptsPets: t.boolean().notNull().default(false),
  bathroomType: bathroomTypeEnum().notNull().default("shared"),
  furnished: furnishedEnum().notNull().default("furnished"),
  depositMonths: t.integer().notNull().default(1),
  leaseMonths: t.integer().notNull().default(12),
  couplesAllowed: t.boolean().notNull().default(false),
  smokingPolicy: smokingPolicyEnum().notNull().default("no"),
  overnightGuests: overnightGuestsEnum().notNull().default("ask"),
  wfhFriendly: t.boolean().notNull().default(false),
  quietHome: t.boolean().notNull().default(false),
  cleanliness: cleanlinessEnum().notNull().default("average"),
  availableFrom: t.timestamp({ mode: "date", withTimezone: true }),
  status: roomStatusEnum().notNull().default("listed"),
  createdAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const RoomImage = pgTable("room_image", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  roomId: t
    .uuid()
    .notNull()
    .references(() => Room.id, { onDelete: "cascade" }),
  url: t.text().notNull(),
  alt: t.varchar({ length: 256 }),
  sortOrder: t.integer().notNull().default(0),
  kind: roomImageKindEnum().notNull().default("room"),
}));

export const Stay = pgTable("stay", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  roomId: t
    .uuid()
    .notNull()
    .references(() => Room.id, { onDelete: "cascade" }),
  userId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  applicationId: t
    .uuid()
    .references(() => Application.id, { onDelete: "set null" }),
  startedAt: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
  /** Exclusive end. Null means open-ended. */
  endedAt: t.timestamp({ mode: "date", withTimezone: true }),
  status: stayStatusEnum().notNull().default("current"),
}));

export const RoommeRating = pgTable(
  "roomme_rating",
  (t) => ({
    id: t.uuid().notNull().primaryKey().defaultRandom(),
    raterId: t
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    rateeId: t
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    stayId: t
      .uuid()
      .notNull()
      .references(() => Stay.id, { onDelete: "cascade" }),
    score: t.integer().notNull(),
    comment: t.text(),
    createdAt: t
      .timestamp({ mode: "date", withTimezone: true })
      .defaultNow()
      .notNull(),
  }),
  (t) => [
    unique("roomme_rating_rater_ratee_stay").on(t.raterId, t.rateeId, t.stayId),
  ],
);

export const Application = pgTable(
  "application",
  (t) => ({
    id: t.uuid().notNull().primaryKey().defaultRandom(),
    roomId: t
      .uuid()
      .notNull()
      .references(() => Room.id, { onDelete: "cascade" }),
    applicantId: t
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    message: t.text(),
    moveInDate: t.date({ mode: "string" }),
    leaseMonths: t.integer(),
    status: applicationStatusEnum().notNull().default("pending"),
    createdAt: t
      .timestamp({ mode: "date", withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp({ mode: "date", withTimezone: true })
      .$onUpdateFn(() => sql`now()`),
  }),
  (t) => [unique("application_room_applicant").on(t.roomId, t.applicantId)],
);

export const AgentWeeklyHours = pgTable(
  "agent_weekly_hours",
  (t) => ({
    id: t.uuid().notNull().primaryKey().defaultRandom(),
    agentId: t
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    dayOfWeek: t.integer().notNull(),
    startMinute: t.integer().notNull(),
    endMinute: t.integer().notNull(),
  }),
  (t) => [
    unique("agent_weekly_hours_unique").on(
      t.agentId,
      t.dayOfWeek,
      t.startMinute,
    ),
  ],
);

export const AgentBlockedDate = pgTable(
  "agent_blocked_date",
  (t) => ({
    id: t.uuid().notNull().primaryKey().defaultRandom(),
    agentId: t
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    date: t.date({ mode: "date" }).notNull(),
    note: t.varchar({ length: 256 }),
  }),
  (t) => [unique("agent_blocked_date_unique").on(t.agentId, t.date)],
);

export const TourBooking = pgTable(
  "tour_booking",
  (t) => ({
    id: t.uuid().notNull().primaryKey().defaultRandom(),
    roomId: t
      .uuid()
      .notNull()
      .references(() => Room.id, { onDelete: "cascade" }),
    agentId: t
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    seekerId: t
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    startsAt: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
    endsAt: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
    status: tourBookingStatusEnum().notNull().default("scheduled"),
    rescheduledFromId: t.uuid(),
    createdAt: t
      .timestamp({ mode: "date", withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp({ mode: "date", withTimezone: true })
      .$onUpdateFn(() => sql`now()`),
  }),
  (t) => [
    uniqueIndex("tour_booking_agent_starts_scheduled_uidx")
      .on(t.agentId, t.startsAt)
      .where(sql`${t.status} = 'scheduled'`),
  ],
);

export const propertyRelations = relations(Property, ({ one, many }) => ({
  owner: one(user, {
    fields: [Property.ownerId],
    references: [user.id],
    relationName: "propertyOwner",
  }),
  images: many(PropertyImage),
  rooms: many(Room),
}));

export const propertyImageRelations = relations(PropertyImage, ({ one }) => ({
  property: one(Property, {
    fields: [PropertyImage.propertyId],
    references: [Property.id],
  }),
}));

export const roomRelations = relations(Room, ({ one, many }) => ({
  host: one(user, {
    fields: [Room.hostId],
    references: [user.id],
    relationName: "roomHost",
  }),
  property: one(Property, {
    fields: [Room.propertyId],
    references: [Property.id],
  }),
  images: many(RoomImage),
  stays: many(Stay),
  applications: many(Application),
  tourBookings: many(TourBooking),
}));

export const roomImageRelations = relations(RoomImage, ({ one }) => ({
  room: one(Room, {
    fields: [RoomImage.roomId],
    references: [Room.id],
  }),
}));

export const stayRelations = relations(Stay, ({ one, many }) => ({
  room: one(Room, {
    fields: [Stay.roomId],
    references: [Room.id],
  }),
  roomie: one(user, {
    fields: [Stay.userId],
    references: [user.id],
  }),
  application: one(Application, {
    fields: [Stay.applicationId],
    references: [Application.id],
  }),
  ratings: many(RoommeRating),
}));

export const userRelations = relations(user, ({ many }) => ({
  hostedRooms: many(Room, { relationName: "roomHost" }),
  ownedProperties: many(Property, { relationName: "propertyOwner" }),
  stays: many(Stay),
  ratingsGiven: many(RoommeRating, { relationName: "ratingRater" }),
  ratingsReceived: many(RoommeRating, { relationName: "ratingRatee" }),
  applications: many(Application),
  weeklyHours: many(AgentWeeklyHours),
  blockedDates: many(AgentBlockedDate),
  agentTours: many(TourBooking, { relationName: "tourAgent" }),
  seekerTours: many(TourBooking, { relationName: "tourSeeker" }),
}));

export const applicationRelations = relations(Application, ({ one, many }) => ({
  room: one(Room, {
    fields: [Application.roomId],
    references: [Room.id],
  }),
  applicant: one(user, {
    fields: [Application.applicantId],
    references: [user.id],
  }),
  stays: many(Stay),
}));

export const agentWeeklyHoursRelations = relations(
  AgentWeeklyHours,
  ({ one }) => ({
    agent: one(user, {
      fields: [AgentWeeklyHours.agentId],
      references: [user.id],
    }),
  }),
);

export const agentBlockedDateRelations = relations(
  AgentBlockedDate,
  ({ one }) => ({
    agent: one(user, {
      fields: [AgentBlockedDate.agentId],
      references: [user.id],
    }),
  }),
);

export const tourBookingRelations = relations(TourBooking, ({ one }) => ({
  room: one(Room, {
    fields: [TourBooking.roomId],
    references: [Room.id],
  }),
  agent: one(user, {
    fields: [TourBooking.agentId],
    references: [user.id],
    relationName: "tourAgent",
  }),
  seeker: one(user, {
    fields: [TourBooking.seekerId],
    references: [user.id],
    relationName: "tourSeeker",
  }),
}));

export const roommeRatingRelations = relations(RoommeRating, ({ one }) => ({
  rater: one(user, {
    fields: [RoommeRating.raterId],
    references: [user.id],
    relationName: "ratingRater",
  }),
  ratee: one(user, {
    fields: [RoommeRating.rateeId],
    references: [user.id],
    relationName: "ratingRatee",
  }),
  stay: one(Stay, {
    fields: [RoommeRating.stayId],
    references: [Stay.id],
  }),
}));

export const CreatePropertySchema = createInsertSchema(Property, {
  title: z.string().min(1).max(256),
  description: z.string().min(1).max(4000),
  addressLine1: z.string().min(1).max(256),
  neighborhood: z.string().min(1).max(128),
  city: z.enum(["queretaro", "cdmx"]),
}).omit({
  id: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
});

export const CreateRoomSchema = createInsertSchema(Room, {
  title: z.string().min(1).max(256),
  description: z.string().min(1).max(4000),
  priceCents: z.number().int().positive(),
  capacity: z.number().int().min(1).max(12),
}).omit({
  id: true,
  hostId: true,
  propertyId: true,
  createdAt: true,
  updatedAt: true,
});
