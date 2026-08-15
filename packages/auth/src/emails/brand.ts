export const EMAIL_BRAND = {
  green: "#00713e",
  greenDark: "#005c32",
  buttonText: "#ffffff",
  background: "#f3f0f5",
  card: "#ffffff",
  text: "#1e1b20",
  muted: "#6b6570",
  border: "#e4dfe8",
  surface: "#f7f5f9",
  radius: "12px",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  siteUrl: "https://roome.mx",
  productName: "RooMe",
} as const;

export const emailAppUrl = (path: string): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${EMAIL_BRAND.siteUrl}${normalized}`;
};

export const logoSvg = (size = 32): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${String(size)}" height="${String(size)}" viewBox="0 0 32 32" role="img" aria-hidden="true"><path fill="${EMAIL_BRAND.green}" fill-rule="evenodd" d="M2.2 6.5h27.6v21.5H2.2V6.5Zm2.3 21.5V12.8a3.1 3.1 0 0 1 6.2 0V28H4.5Zm8.5 0V12.8a3.1 3.1 0 0 1 6.2 0V28H13Zm8.5 0V12.8a3.1 3.1 0 0 1 6.2 0V28H21.5Z"/></svg>`;
