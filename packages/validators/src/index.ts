import { z } from "zod/v4";

export const CitySchema = z.enum(["queretaro"]);
export type City = z.infer<typeof CitySchema>;

export const CurrencySchema = z.enum(["MXN", "USD"]);
export type Currency = z.infer<typeof CurrencySchema>;

export const HouseholdGenderSchema = z.enum(["male", "female", "mixed"]);
export type HouseholdGender = z.infer<typeof HouseholdGenderSchema>;

export const BathroomTypeSchema = z.enum(["private", "shared"]);
export type BathroomType = z.infer<typeof BathroomTypeSchema>;

export const FurnishedSchema = z.enum(["furnished", "semi", "unfurnished"]);
export type Furnished = z.infer<typeof FurnishedSchema>;

export const SmokingPolicySchema = z.enum(["no", "outdoor", "yes"]);
export type SmokingPolicy = z.infer<typeof SmokingPolicySchema>;

export const OvernightGuestsSchema = z.enum(["no", "ask", "yes"]);
export type OvernightGuests = z.infer<typeof OvernightGuestsSchema>;

export const CleanlinessSchema = z.enum(["relaxed", "average", "tidy"]);
export type Cleanliness = z.infer<typeof CleanlinessSchema>;

export const LISTING_INCLUDES = [
  "wifi",
  "water",
  "electricity",
  "gas",
  "cleaning",
] as const;
export const ListingIncludeSchema = z.enum(LISTING_INCLUDES);
export type ListingInclude = z.infer<typeof ListingIncludeSchema>;

export const PROPERTY_AMENITIES = [
  "wifi",
  "rooftop",
  "laundry",
  "kitchen",
  "security",
  "terrace",
  "parking",
  "patio",
  "pool",
  "gym",
  "garden",
  "furnished",
  "padel",
  "tennis",
] as const;
export type PresetAmenity = (typeof PROPERTY_AMENITIES)[number];

export const MAX_AMENITY_LENGTH = 48;
export const MAX_AMENITIES = 24;

export const PropertyAmenitySchema = z
  .string()
  .trim()
  .min(1)
  .max(MAX_AMENITY_LENGTH);
export type PropertyAmenity = z.infer<typeof PropertyAmenitySchema>;

export const isPresetAmenity = (value: string): value is PresetAmenity =>
  PROPERTY_AMENITIES.some((item) => item === value);

export const PROFILE_HOBBIES = [
  "cooking",
  "gym",
  "running",
  "music",
  "movies",
  "reading",
  "hiking",
  "photography",
  "gaming",
  "yoga",
  "art",
  "travel",
  "coffee",
  "cycling",
  "dancing",
] as const;
export type PresetHobby = (typeof PROFILE_HOBBIES)[number];

export const PROFILE_PERSONALITIES = [
  "organized",
  "quiet",
  "social",
  "earlyRiser",
  "nightOwl",
  "clean",
  "easygoing",
  "punctual",
  "introvert",
  "extrovert",
  "adventurous",
] as const;
export type PresetPersonality = (typeof PROFILE_PERSONALITIES)[number];

export const PET_TYPES = [
  "dog",
  "cat",
  "bird",
  "fish",
  "rabbit",
  "other",
] as const;
export type PetType = (typeof PET_TYPES)[number];

export const PET_SIZES = ["small", "medium", "large"] as const;
export type PetSize = (typeof PET_SIZES)[number];

export const MAX_PROFILE_TAG_LENGTH = 64;
export const MAX_PROFILE_TAGS = 20;

export const ProfileTagSchema = z
  .string()
  .trim()
  .min(1)
  .max(MAX_PROFILE_TAG_LENGTH);

export const PetTypeSchema = z.enum(PET_TYPES);
export const PetSizeSchema = z.enum(PET_SIZES);

export const isPresetHobby = (value: string): value is PresetHobby =>
  PROFILE_HOBBIES.some((item) => item === value);

export const isPresetPersonality = (
  value: string,
): value is PresetPersonality =>
  PROFILE_PERSONALITIES.some((item) => item === value);

export const LEASE_MONTHS = [1, 3, 6, 12] as const;
export const LeaseMonthsSchema = z.coerce
  .number()
  .int()
  .refine(
    (value): value is (typeof LEASE_MONTHS)[number] =>
      LEASE_MONTHS.includes(value as (typeof LEASE_MONTHS)[number]),
    { message: "Lease must be 1, 3, 6, or 12 months" },
  );
export type LeaseMonths = (typeof LEASE_MONTHS)[number];

export const LISTING_TYPES = ["room", "entire_property"] as const;
export const ListingTypeSchema = z.enum(LISTING_TYPES);
export type ListingType = z.infer<typeof ListingTypeSchema>;

export const PROPERTY_TYPES = [
  "house",
  "apartment",
  "condo",
  "villa",
  "building",
  "hotel",
  "other",
] as const;
export const PropertyTypeSchema = z.enum(PROPERTY_TYPES);
export type PropertyType = z.infer<typeof PropertyTypeSchema>;

export const isRoomListing = (value: { listingType: ListingType }): boolean =>
  value.listingType === "room";

/** Form sentinel for "no existing property selected; use a new address". */
export const NONE_PROPERTY_ID = "none";

const AgeSchema = z.number().int().min(18).max(99);

export const MAX_LISTING_IMAGES = 12;
export const MAX_BEDROOMS = 20;
export const MAX_BATHROOMS = 20;

export const ListingImageUrlSchema = z.url({
  message: "Enter a valid image URL",
});

export const ListingImagesSchema = z
  .array(ListingImageUrlSchema)
  .max(MAX_LISTING_IMAGES);

const BedroomCountSchema = z.number().int().min(0).max(MAX_BEDROOMS);
const BathroomCountSchema = z
  .number()
  .min(0)
  .max(MAX_BATHROOMS)
  .refine((value) => Number.isInteger(value * 2), {
    message: "Use whole or half bathrooms",
  });

const requireMapPin = (
  data: { latitude?: number; longitude?: number },
  ctx: z.RefinementCtx,
): void => {
  if (data.latitude === undefined || data.longitude === undefined) {
    ctx.addIssue({
      code: "custom",
      path: ["latitude"],
      message: "A map pin is required",
    });
  }
};

interface ListingTypeRefinementInput {
  listingType: ListingType;
  preferredAgeMin: number;
  preferredAgeMax: number;
  bedroomCount?: number;
  bathroomCount?: number;
}

/** Room listings validate household fields; entire properties need layout. */
const refineListingType = (
  data: ListingTypeRefinementInput,
  ctx: z.RefinementCtx,
): void => {
  if (data.listingType === "room") {
    if (data.preferredAgeMin > data.preferredAgeMax) {
      ctx.addIssue({
        code: "custom",
        path: ["preferredAgeMax"],
        message: "Minimum age must be less than or equal to maximum age",
      });
    }
    return;
  }

  if (data.bedroomCount === undefined || data.bedroomCount < 1) {
    ctx.addIssue({
      code: "custom",
      path: ["bedroomCount"],
      message: "Add at least one bedroom",
    });
  }
  if (data.bathroomCount === undefined || data.bathroomCount < 0.5) {
    ctx.addIssue({
      code: "custom",
      path: ["bathroomCount"],
      message: "Add at least one bathroom",
    });
  }
};

export const CreateListingSchema = z
  .object({
    listingType: ListingTypeSchema.default("room"),
    propertyType: PropertyTypeSchema.default("house"),
    /** Existing property to attach to. Omit to create a new owned property. */
    propertyId: z.uuid().optional(),
    bedroomCount: BedroomCountSchema.optional(),
    bathroomCount: BathroomCountSchema.optional(),
    addressLine1: z.string().min(1).max(256),
    city: CitySchema,
    neighborhood: z.string().min(1).max(128),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    title: z.string().min(1).max(256),
    description: z.string().min(1).max(4000),
    rentPriceMxn: z.number().positive(),
    includes: z.array(ListingIncludeSchema).default([]),
    capacity: z.number().int().min(1).max(12).default(1),
    householdGender: HouseholdGenderSchema.default("mixed"),
    preferredAgeMin: AgeSchema.default(18),
    preferredAgeMax: AgeSchema.default(99),
    hasPets: z.boolean().default(false),
    acceptsPets: z.boolean().default(false),
    bathroomType: BathroomTypeSchema.default("shared"),
    furnished: FurnishedSchema.default("furnished"),
    availableFrom: z.coerce.date(),
    depositMonths: z.number().int().min(0).max(3).default(1),
    leaseMonths: LeaseMonthsSchema.default(12),
    couplesAllowed: z.boolean().default(false),
    smokingPolicy: SmokingPolicySchema.default("no"),
    overnightGuests: OvernightGuestsSchema.default("ask"),
    wfhFriendly: z.boolean().default(false),
    quietHome: z.boolean().default(false),
    cleanliness: CleanlinessSchema.default("average"),
    images: ListingImagesSchema.default([]),
  })
  .superRefine((data, ctx) => {
    refineListingType(data, ctx);
    if (data.propertyId) {
      return;
    }
    requireMapPin(data, ctx);
  });

export type CreateListingInput = z.infer<typeof CreateListingSchema>;

export const UpdateListingSchema = z
  .object({ id: z.uuid() })
  .and(CreateListingSchema);
export type UpdateListingInput = z.infer<typeof UpdateListingSchema>;

export const ListingFormSchema = z
  .object({
    listingType: ListingTypeSchema,
    propertyType: PropertyTypeSchema,
    propertyId: z.string(),
    bedroomCount: BedroomCountSchema,
    bathroomCount: BathroomCountSchema,
    addressLine1: z.string().max(256),
    city: CitySchema,
    neighborhood: z.string().max(128),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    title: z.string().min(1).max(256),
    description: z.string().min(1).max(4000),
    rentPriceMxn: z.number().positive(),
    includes: z.array(ListingIncludeSchema),
    capacity: z.number().int().min(1).max(12),
    householdGender: HouseholdGenderSchema,
    preferredAgeMin: AgeSchema,
    preferredAgeMax: AgeSchema,
    hasPets: z.boolean(),
    acceptsPets: z.boolean(),
    bathroomType: BathroomTypeSchema,
    furnished: FurnishedSchema,
    availableFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Choose an available-from date",
    }),
    depositMonths: z.number().int().min(0).max(3),
    leaseMonths: z
      .number()
      .int()
      .refine(
        (value): value is LeaseMonths =>
          LEASE_MONTHS.includes(value as LeaseMonths),
        { message: "Lease must be 1, 3, 6, or 12 months" },
      ),
    couplesAllowed: z.boolean(),
    smokingPolicy: SmokingPolicySchema,
    overnightGuests: OvernightGuestsSchema,
    wfhFriendly: z.boolean(),
    quietHome: z.boolean(),
    cleanliness: CleanlinessSchema,
    images: ListingImagesSchema,
  })
  .superRefine((data, ctx) => {
    refineListingType(data, ctx);

    const attached =
      data.propertyId !== NONE_PROPERTY_ID && data.propertyId.length > 0;

    if (attached) {
      return;
    }

    if (data.addressLine1.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["addressLine1"],
        message: "Address is required",
      });
    }

    if (data.neighborhood.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["neighborhood"],
        message: "Neighborhood is required",
      });
    }

    requireMapPin(data, ctx);
  });

export type ListingFormValues = z.infer<typeof ListingFormSchema>;

export const PropertyFormSchema = z
  .object({
    propertyType: PropertyTypeSchema,
    /** Agents/admins only: an ownerless building anyone can list rooms in. */
    isSharedBuilding: z.boolean(),
    title: z.string().min(1).max(256),
    description: z.string().min(1).max(4000),
    addressLine1: z.string().min(1).max(256),
    city: CitySchema,
    neighborhood: z.string().min(1).max(128),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    bedroomCount: BedroomCountSchema.optional(),
    bathroomCount: BathroomCountSchema.optional(),
    petFriendly: z.boolean(),
    amenities: z.array(PropertyAmenitySchema).max(MAX_AMENITIES),
    images: ListingImagesSchema,
  })
  .superRefine((data, ctx) => {
    requireMapPin(data, ctx);
  });

export type PropertyFormValues = z.infer<typeof PropertyFormSchema>;

export const CreatePropertySchema = PropertyFormSchema;
export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;

export const UpdatePropertySchema = z
  .object({ id: z.uuid() })
  .and(PropertyFormSchema);
export type UpdatePropertyInput = z.infer<typeof UpdatePropertySchema>;

const CalendarDateKeySchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Expected YYYY-MM-DD" });

export const ApplyToListingSchema = z.object({
  roomId: z.uuid(),
  message: z.string().max(2000).optional(),
  moveInDate: CalendarDateKeySchema,
  leaseMonths: LeaseMonthsSchema,
});
export type ApplyToListingInput = z.infer<typeof ApplyToListingSchema>;

export const ListListingsSchema = z.object({
  city: CitySchema.optional(),
  limit: z.number().int().min(1).max(50).optional(),
  minRentMxn: z.coerce.number().nonnegative().optional(),
  maxRentMxn: z.coerce.number().positive().optional(),
  householdGender: HouseholdGenderSchema.optional(),
  seekerAge: AgeSchema.optional(),
  hasPets: z.boolean().optional(),
  acceptsPets: z.boolean().optional(),
  bathroomType: BathroomTypeSchema.optional(),
  furnished: FurnishedSchema.optional(),
  couplesAllowed: z.boolean().optional(),
  smokingPolicy: SmokingPolicySchema.optional(),
  overnightGuests: OvernightGuestsSchema.optional(),
  wfhFriendly: z.boolean().optional(),
  quietHome: z.boolean().optional(),
  cleanliness: CleanlinessSchema.optional(),
  includes: z.array(ListingIncludeSchema).optional(),
  availableBy: z.coerce.date().optional(),
  listingType: ListingTypeSchema.optional(),
  propertyType: PropertyTypeSchema.optional(),
});

export type ListListingsInput = z.infer<typeof ListListingsSchema>;
