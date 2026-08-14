export const ROLES = ["roomie", "host", "agent", "admin"] as const;

export type Role = (typeof ROLES)[number];

export const parseRoles = (role: string | null | undefined): Role[] => {
  if (!role) {
    return [];
  }

  return role
    .split(",")
    .map((value) => value.trim())
    .filter((value): value is Role => ROLES.includes(value as Role));
};

export const hasRole = (
  role: string | null | undefined,
  wanted: Role,
): boolean => parseRoles(role).includes(wanted);

export const hasAnyRole = (
  role: string | null | undefined,
  wanted: readonly Role[],
): boolean => {
  const current = parseRoles(role);
  return wanted.some((value) => current.includes(value));
};

export const withRole = (
  role: string | null | undefined,
  extra: Role,
): string => {
  const current = parseRoles(role);
  if (current.includes(extra)) {
    return current.join(",");
  }
  if (current.length === 0) {
    return extra;
  }
  return [...current, extra].join(",");
};
