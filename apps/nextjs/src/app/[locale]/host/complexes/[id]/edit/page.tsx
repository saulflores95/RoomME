import type { JSX } from "react";

import { redirect } from "~/i18n/navigation";

export default async function EditComplexRedirectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<JSX.Element> {
  const { locale, id } = await params;
  return redirect({ href: `/host/properties/${id}/edit`, locale });
}
