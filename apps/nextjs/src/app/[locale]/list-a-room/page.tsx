import type { JSX } from "react";

import { redirect } from "~/i18n/navigation";

export default async function ListARoomPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const { locale } = await params;
  return redirect({ href: "/list?type=room", locale });
}
