"use client";

import type { JSX, ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";

export const Fact = ({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element => (
  <div className="border-border rounded-xl border px-3 py-2.5">
    <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
      {label}
    </dt>
    <dd className="mt-1 text-sm font-medium">{value}</dd>
  </div>
);

export const Pill = ({ children }: { children: string }): JSX.Element => (
  <span className="border-border bg-muted/50 inline-flex items-center rounded-full border px-3 py-1 text-sm">
    {children}
  </span>
);

export const ActionTooltip = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}): JSX.Element => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="inline-flex">{children}</span>
    </TooltipTrigger>
    <TooltipContent side="bottom">{label}</TooltipContent>
  </Tooltip>
);
