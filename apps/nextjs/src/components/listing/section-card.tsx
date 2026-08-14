import type { JSX, ReactNode } from "react";

export function ListingSectionCard({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <section className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
      <header className="border-border flex items-start gap-3 border-b px-5 py-4">
        <span className="bg-primary text-primary-foreground mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
          {step}
        </span>
        <div className="min-w-0 space-y-1">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}
