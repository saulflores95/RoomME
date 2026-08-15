export const LISTING_CONTACT_PHONE = "+524427401739";
export const LISTING_CONTACT_PHONE_DISPLAY = "+52 442 740 1739";
export const LISTING_CONTACT_TEL_URL = `tel:${LISTING_CONTACT_PHONE}`;

export const listingWhatsAppUrl = (message: string): string =>
  `https://wa.me/524427401739?text=${encodeURIComponent(message)}`;
