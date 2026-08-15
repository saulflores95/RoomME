import type { JSX, ReactNode } from "react";

export function SettingsSectionCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}): JSX.Element {
  return (
    <section className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
      <header className="border-border border-b px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      </header>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
      {footer ? (
        <footer className="border-border bg-muted/30 border-t px-5 py-4 sm:px-6">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}
