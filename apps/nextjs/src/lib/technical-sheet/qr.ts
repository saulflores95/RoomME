import QRCode from "qrcode";

import { SHEET_COLORS } from "./colors";

export const createQrDataUrl = async (url: string): Promise<string | null> => {
  try {
    return await QRCode.toDataURL(url, {
      errorCorrectionLevel: "M",
      margin: 0,
      width: 360,
      color: { dark: SHEET_COLORS.foreground, light: "#ffffff" },
    });
  } catch (error) {
    console.error("Failed to generate technical sheet QR code", { url, error });
    return null;
  }
};
