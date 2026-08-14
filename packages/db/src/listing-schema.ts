import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

import { user } from "./auth-schema";

export const cityEnum = pgEnum("city", ["queretaro", "cdmx"]);
export const roomStatusEnum = pgEnum("room_status", [
  "draft",
  "listed",
  "occupied",
  "unlisted",
]);
export const complexImageKindEnum = pgEnum("complex_image_kind", [
  "exterior",
  "common",
  "other",
]);
export const roomImageKindEnum = pgEnum("room_image_kind", [
  "room",
  "apartment",
]);
export const stayStatusEnum = pgEnum("stay_status", ["current", "past"]);
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

export const Complex = pgTable("complex", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  hostId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  agentId: t.text().references(() => user.id, { onDelete: "set null" }),
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

export const ComplexImage = pgTable("complex_image", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  complexId: t
    .uuid()
    .notNull()
    .references(() => Complex.id, { onDelete: "cascade" }),
  url: t.text().notNull(),
  alt: t.varchar({ length: 256 }),
  sortOrder: t.integer().notNull().default(0),
  kind: complexImageKindEnum().notNull().default("other"),
}));

export const Room = pgTable("room", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  hostId: t.text().references(() => user.id, { onDelete: "cascade" }),
  complexId: t.uuid().references(() => Complex.id, { onDelete: "cascade" }),
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
  rentPriceCents: t.integer().notNull(),
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
  startedAt: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
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

export const complexRelations = relations(Complex, ({ one, many }) => ({
  host: one(user, {
    fields: [Complex.hostId],
    references: [user.id],
    relationName: "complexHost",
  }),
  agent: one(user, {
    fields: [Complex.agentId],
    references: [user.id],
    relationName: "complexAgent",
  }),
  images: many(ComplexImage),
  rooms: many(Room),
}));

export const complexImageRelations = relations(ComplexImage, ({ one }) => ({
  complex: one(Complex, {
    fields: [ComplexImage.complexId],
    references: [Complex.id],
  }),
}));

export const roomRelations = relations(Room, ({ one, many }) => ({
  host: one(user, {
    fields: [Room.hostId],
    references: [user.id],
    relationName: "roomHost",
  }),
  complex: one(Complex, {
    fields: [Room.complexId],
    references: [Complex.id],
  }),
  images: many(RoomImage),
  stays: many(Stay),
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
  ratings: many(RoommeRating),
}));

export const userRelations = relations(user, ({ many }) => ({
  hostedComplexes: many(Complex, { relationName: "complexHost" }),
  agentComplexes: many(Complex, { relationName: "complexAgent" }),
  hostedRooms: many(Room, { relationName: "roomHost" }),
  stays: many(Stay),
  ratingsGiven: many(RoommeRating, { relationName: "ratingRater" }),
  ratingsReceived: many(RoommeRating, { relationName: "ratingRatee" }),
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

export const CreateComplexSchema = createInsertSchema(Complex, {
  title: z.string().min(1).max(256),
  description: z.string().min(1).max(4000),
  addressLine1: z.string().min(1).max(256),
  neighborhood: z.string().min(1).max(128),
  city: z.enum(["queretaro", "cdmx"]),
}).omit({
  id: true,
  hostId: true,
  agentId: true,
  createdAt: true,
  updatedAt: true,
});

export const CreateRoomSchema = createInsertSchema(Room, {
  title: z.string().min(1).max(256),
  description: z.string().min(1).max(4000),
  rentPriceCents: z.number().int().positive(),
  capacity: z.number().int().min(1).max(12),
}).omit({
  id: true,
  hostId: true,
  complexId: true,
  createdAt: true,
  updatedAt: true,
});
