import type { FieldErrors, FieldValues } from "react-hook-form";

import { toast } from "@acme/ui/toast";

interface FieldIssue {
  path: string;
  message: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/** Depth-first search for the first leaf error, including array items. */
export const firstFieldIssue = (
  errors: unknown,
  prefix = "",
): FieldIssue | null => {
  if (!isRecord(errors)) {
    return null;
  }

  if (typeof errors.message === "string" && errors.message.length > 0) {
    return { path: prefix, message: errors.message };
  }

  for (const [key, value] of Object.entries(errors)) {
    if (key === "ref" || key === "type" || key === "types") {
      continue;
    }
    const issue = firstFieldIssue(value, prefix ? `${prefix}.${key}` : key);
    if (issue) {
      return issue;
    }
  }

  return null;
};

interface FlattenedZodError {
  formErrors: string[];
  fieldErrors: Partial<Record<string, string[]>>;
}

interface MutationErrorLike {
  message: string;
  data?: { zodError?: FlattenedZodError | null } | null;
}

/** Server validation errors arrive as a JSON blob in `message`; prefer the flattened issues. */
export const mutationErrorMessage = (error: MutationErrorLike): string => {
  const zodError = error.data?.zodError;
  if (!zodError) {
    return error.message;
  }

  for (const [field, messages] of Object.entries(zodError.fieldErrors)) {
    const [first] = messages ?? [];
    if (first) {
      return `${field}: ${first}`;
    }
  }

  return zodError.formErrors[0] ?? error.message;
};

/**
 * Some invalid fields are not rendered (e.g. sections hidden for the current
 * listing type), so a failed submit must always give visible feedback.
 */
export const notifyInvalidSubmit = <T extends FieldValues>(
  errors: FieldErrors<T>,
  title: string,
): void => {
  const issue = firstFieldIssue(errors);
  console.warn("Form submit blocked by validation", errors);
  toast.error(title, {
    description: issue ? `${issue.path}: ${issue.message}` : undefined,
  });
};
