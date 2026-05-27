import { cn } from "../../lib/cn";

// ─── Badge ─────────────────────────────────────────────────────────────────────
// Single source of truth for all status/type badges in the app.
// Uses .badge + .badge-{variant} from components.css — token-driven, theme-aware.

const variantMap = {
  success: "badge-success",
  warning: "badge-warning",
  danger:  "badge-danger",
  info:    "badge-info",
  neutral: "badge-neutral",
  violet:  "badge-violet",
  accent:  "badge-accent",

  // Semantic aliases used across the app
  complete:    "badge-success",
  pending:     "badge-warning",
  critical:    "badge-danger",
  active:      "badge-success",
  inactive:    "badge-neutral",
  static:      "badge-neutral",
  dynamic:     "badge-violet",
  collision:   "badge-info",
  dealership:  "badge-violet",
};

export default function Badge({ variant = "neutral", icon: Icon, children, className }) {
  return (
    <span className={cn("badge", variantMap[variant] ?? "badge-neutral", className)}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}