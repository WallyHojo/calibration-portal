import { TrendingUp, AlertTriangle, TrendingDown } from "lucide-react";
import { cn } from "../../lib/cn";

// Map stat color keys to CSS token variables
const colorMap = {
  blue:    { value: "var(--accent-text)",      icon: "var(--info-bg)",    iconFg: "var(--info-text)"    },
  amber:   { value: "var(--warning-text)",     icon: "var(--warning-bg)", iconFg: "var(--warning-text)" },
  slate:   { value: "var(--text-secondary)",   icon: "var(--surface-inset)",iconFg:"var(--text-tertiary)"},
  emerald: { value: "var(--success-text)",     icon: "var(--success-bg)", iconFg: "var(--success-text)" },
  violet:  { value: "var(--violet-text)",      icon: "var(--violet-bg)",  iconFg: "var(--violet-text)"  },
};

const deltaVariantMap = {
  up:   "badge badge-success",
  warn: "badge badge-warning",
  down: "badge badge-danger",
};

function TrendIcon({ trend }) {
  if (trend === "up")   return <TrendingUp   className="w-3.5 h-3.5" />;
  if (trend === "warn") return <AlertTriangle className="w-3.5 h-3.5" />;
  return <TrendingDown className="w-3.5 h-3.5" />;
}

export default function StatCard({ label, value, delta, trend, color, icon: Icon }) {
  const cfg = colorMap[color] ?? colorMap.slate;

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        {Icon && (
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: cfg.icon }}
          >
            <Icon className="w-4 h-4" style={{ color: cfg.iconFg }} />
          </div>
        )}
      </div>

      <p
        className="text-3xl font-bold font-mono tracking-tight"
        style={{ color: cfg.value }}
      >
        {value.toLocaleString()}
      </p>

      <div className={cn(deltaVariantMap[trend] ?? "badge badge-neutral", "w-fit")}>
        <TrendIcon trend={trend} />
        <span>{delta}</span>
      </div>
    </div>
  );
}