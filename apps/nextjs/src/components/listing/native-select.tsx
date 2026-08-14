import { cn } from "@acme/ui";

export function NativeSelect({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm",
        className,
      )}
      {...props}
    />
  );
}
