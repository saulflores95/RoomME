"use client";

import type { FormEvent } from "react";

import { useRouter } from "~/i18n/navigation";
import { getFormString } from "~/utils/form-data";

const SUGGESTIONS = [
  {
    labels: ["querétaro", "queretaro", "juriquilla", "centro sur"],
  },
] as const;

export function LocationSearch({ placeholder }: { placeholder: string }) {
  const router = useRouter();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = getFormString(data, "q").trim().toLowerCase();
    const match = SUGGESTIONS.find((item) =>
      item.labels.some(
        (label) => query.includes(label) || label.includes(query),
      ),
    );
    if (match) {
      router.push("/rooms-for-rent-queretaro");
      return;
    }
    router.push("/rooms");
  };

  return (
    <form
      className="border-border bg-background flex w-full max-w-xl items-center rounded-full border px-4 py-2 shadow-sm"
      onSubmit={onSubmit}
    >
      <span className="text-brand mr-2" aria-hidden>
        ⌖
      </span>
      <input
        name="q"
        type="search"
        placeholder={placeholder}
        className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-base outline-none"
        list="roomme-locations"
      />
      <datalist id="roomme-locations">
        <option value="Querétaro" />
        <option value="Centro Sur" />
        <option value="Juriquilla" />
      </datalist>
      <button
        type="submit"
        className="bg-foreground text-background ml-2 flex size-10 items-center justify-center rounded-full"
        aria-label="Search"
      >
        →
      </button>
    </form>
  );
}
