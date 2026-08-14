import { z } from "zod/v4";

export const CitySchema = z.enum(["queretaro", "cdmx"]);
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

export const COMPLEX_AMENITIES = [
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
] as const;
export const ComplexAmenitySchema = z.enum(COMPLEX_AMENITIES);
export type ComplexAmenity = z.infer<typeof ComplexAmenitySchema>;

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

export const NONE_COMPLEX_ID = "none";

const AgeSchema = z.number().int().min(18).max(99);

const OptionalUrlSchema = z.union([
  z.literal(""),
  z.url({ message: "Enter a valid URL" }),
]);

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

export const CreateListingSchema = z
  .object({
    isComplex: z.boolean().default(false),
    complexId: z.uuid().optional(),
    addressLine1: z.string().min(1).max(256),
    city: CitySchema,
    neighborhood: z.string().min(1).max(128),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    roomTitle: z.string().min(1).max(256),
    roomDescription: z.string().min(1).max(4000),
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
    roomImageUrl: z.string().optional(),
  })
  .refine((value) => value.preferredAgeMin <= value.preferredAgeMax, {
    message: "Minimum age must be less than or equal to maximum age",
    path: ["preferredAgeMax"],
  })
  .superRefine((data, ctx) => {
    if (data.isComplex && data.complexId) {
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
    isComplex: z.boolean(),
    complexId: z.string(),
    addressLine1: z.string().max(256),
    city: CitySchema,
    neighborhood: z.string().max(128),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    roomTitle: z.string().min(1).max(256),
    roomDescription: z.string().min(1).max(4000),
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
    roomImageUrl: OptionalUrlSchema,
  })
  .refine((value) => value.preferredAgeMin <= value.preferredAgeMax, {
    message: "Minimum age must be less than or equal to maximum age",
    path: ["preferredAgeMax"],
  })
  .superRefine((data, ctx) => {
    const attached =
      data.isComplex &&
      data.complexId !== NONE_COMPLEX_ID &&
      data.complexId.length > 0;

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

export const ComplexFormSchema = z
  .object({
    title: z.string().min(1).max(256),
    description: z.string().min(1).max(4000),
    addressLine1: z.string().min(1).max(256),
    city: CitySchema,
    neighborhood: z.string().min(1).max(128),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    petFriendly: z.boolean(),
    amenities: z.array(ComplexAmenitySchema),
    imageUrl: OptionalUrlSchema,
  })
  .superRefine((data, ctx) => {
    requireMapPin(data, ctx);
  });

export type ComplexFormValues = z.infer<typeof ComplexFormSchema>;

export const CreateComplexSchema = ComplexFormSchema;
export type CreateComplexInput = z.infer<typeof CreateComplexSchema>;

export const UpdateComplexSchema = z
  .object({ id: z.uuid() })
  .and(ComplexFormSchema);
export type UpdateComplexInput = z.infer<typeof UpdateComplexSchema>;

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
});

export type ListListingsInput = z.infer<typeof ListListingsSchema>;
