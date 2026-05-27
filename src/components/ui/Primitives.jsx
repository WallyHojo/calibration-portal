import { cn } from "../../lib/cn";

// ─── PageHeader ────────────────────────────────────────────────────────────────
// Standard page title + description + optional right slot.
export function PageHeader({ title, description, children, className }) {
  return (
    <div className={cn("page-header", className)}>
      <div>
        <h2 className="page-title">{title}</h2>
        {description && (
          <p className="page-description">{description}</p>
        )}
      </div>
      {children && (
        <div className="shrink-0 flex items-center gap-2">{children}</div>
      )}
    </div>
  );
}

// ─── EmptyState ────────────────────────────────────────────────────────────────
// Centered no-results state with icon, heading, and optional sub-text.
export function EmptyState({ icon: Icon, title, description, children }) {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state-icon">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <p className="text-sm font-semibold text-secondary mb-1">{title}</p>
      {description && (
        <p className="text-xs text-muted max-w-xs">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

// ─── Field ─────────────────────────────────────────────────────────────────────
// Label + value display pair used in detail pages.
export function Field({ label, value, mono = false }) {
  return (
    <div>
      <p className="label-overline mb-1">{label}</p>
      <p className={cn("text-sm font-medium text-secondary", mono && "font-mono")}>
        {value ?? <span className="text-disabled italic font-normal">—</span>}
      </p>
    </div>
  );
}

// ─── StatusCount ───────────────────────────────────────────────────────────────
// Small pill showing an icon count — used in page headers.
export function StatusCount({ icon: Icon, count, label }) {
  return (
    <div className="flex items-center gap-2 bg-subtle border border-base px-3 py-1.5 rounded-lg">
      {Icon && <Icon className="w-4 h-4 text-muted" />}
      <span className="text-sm font-medium text-secondary">
        {count} {label}
      </span>
    </div>
  );
}

// ─── SortIcon ──────────────────────────────────────────────────────────────────
// Reusable sort indicator for table column headers.
import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";

export function SortIcon({ column, sort }) {
  if (sort.key !== column)
    return <ChevronsUpDown className="w-3.5 h-3.5 text-disabled" />;
  return sort.dir === "asc"
    ? <ChevronUp   className="w-3.5 h-3.5 text-accent" />
    : <ChevronDown className="w-3.5 h-3.5 text-accent" />;
}

// ─── Toggle ────────────────────────────────────────────────────────────────────
// Accessible on/off toggle using .toggle-* from components.css.
export function Toggle({ enabled, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={cn("toggle-track", enabled ? "toggle-track-on" : "toggle-track-off")}
    >
      <span className={cn("toggle-thumb", enabled ? "toggle-thumb-on" : "toggle-thumb-off")} />
    </button>
  );
}

// ─── ViewToggle ────────────────────────────────────────────────────────────────
// Grid / list view switcher.
import { LayoutGrid, List } from "lucide-react";

export function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center card p-1 gap-0.5">
      {[
        { key: "grid", Icon: LayoutGrid, label: "Grid" },
        { key: "list", Icon: List,       label: "List" },
      ].map(({ key, Icon, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
            view === key
              ? "bg-accent text-white shadow-sm"
              : "text-muted hover:text-secondary hover:bg-hover"
          )}
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}