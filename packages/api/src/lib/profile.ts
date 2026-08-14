export const ageFromBirthDate = (
  birthDate: Date | string | null | undefined,
): number | null => {
  if (!birthDate) {
    return null;
  }

  const date = birthDate instanceof Date ? birthDate : new Date(birthDate);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDelta = today.getMonth() - date.getMonth();
  if (
    monthDelta < 0 ||
    (monthDelta === 0 && today.getDate() < date.getDate())
  ) {
    age -= 1;
  }

  return age >= 0 ? age : null;
};

export const roundRatingAverage = (
  value: number | null | undefined,
): number | null => {
  if (value == null || Number.isNaN(value)) {
    return null;
  }
  return Math.round(value * 10) / 10;
};
