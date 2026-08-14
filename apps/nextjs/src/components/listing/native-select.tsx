import { cn } from "@acme/ui";

export function NativeSelect({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "border-input text-foreground bg-muted/40 h-9 w-full rounded-md border px-3 text-sm",
        className,
      )}
      {...props}
    />
  );
}
