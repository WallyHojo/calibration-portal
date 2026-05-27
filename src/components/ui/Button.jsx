import { cn } from "../../lib/cn";

// ─── Button ────────────────────────────────────────────────────────────────────
// Reusable button using .btn + .btn-{variant} + .btn-{size} from components.css.

export default function Button({
  variant  = "primary",
  size     = "md",
  icon: Icon,
  iconRight: IconRight,
  children,
  className,
  loading = false,
  ...props
}) {
  return (
    <button
      className={cn("btn", `btn-${variant}`, `btn-${size}`, className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
      {IconRight && !loading && <IconRight className="w-4 h-4 shrink-0" />}
    </button>
  );
}