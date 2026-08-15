export interface WeeklyHourWindow {
  dayOfWeek: number;
  startMinute: number;
  endMinute: number;
}

export interface ComputeSlotsInput {
  from: Date;
  to: Date;
  weeklyHours: WeeklyHourWindow[];
  blockedDates: Date[];
  existingStarts: Date[];
  slotMinutes: number;
}

const dateKey = (value: Date): string => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const computeAvailableSlots = (input: ComputeSlotsInput): Date[] => {
  const blocked = new Set(input.blockedDates.map(dateKey));
  const taken = new Set(input.existingStarts.map((value) => value.getTime()));
  const slots: Date[] = [];
  const cursor = new Date(input.from);
  cursor.setHours(0, 0, 0, 0);
  const end = new Date(input.to);

  while (cursor < end) {
    if (!blocked.has(dateKey(cursor))) {
      const dayOfWeek = cursor.getDay();
      const windows = input.weeklyHours.filter(
        (hour) => hour.dayOfWeek === dayOfWeek,
      );

      for (const window of windows) {
        for (
          let minute = window.startMinute;
          minute + input.slotMinutes <= window.endMinute;
          minute += input.slotMinutes
        ) {
          const slot = new Date(cursor);
          slot.setHours(Math.floor(minute / 60), minute % 60, 0, 0);
          if (slot < new Date()) {
            continue;
          }
          if (
            slot >= input.from &&
            slot < input.to &&
            !taken.has(slot.getTime())
          ) {
            slots.push(slot);
          }
        }
      }
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return slots;
};
