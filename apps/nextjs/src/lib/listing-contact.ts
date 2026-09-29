export const LISTING_CONTACT_PHONE = "+524427401739";
export const LISTING_CONTACT_PHONE_DISPLAY = "+52 442 740 1739";
export const LISTING_CONTACT_TEL_URL = `tel:${LISTING_CONTACT_PHONE}`;

const whatsAppUrl = (digits: string, message: string): string =>
  `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

export const listingWhatsAppUrl = (message: string): string =>
  whatsAppUrl("524427401739", message);

/** wa.me links take the international number as digits only. */
export const hostWhatsAppUrl = (phone: string, message: string): string =>
  whatsAppUrl(phone.replace(/\D/g, ""), message);
