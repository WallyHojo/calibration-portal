import { Search, X } from "lucide-react";
import { cn } from "../../lib/cn";

const STATUS_TABS = [
  { key: "all",      label: "All" },
  { key: "complete", label: "Complete"    },
  { key: "pending",  label: "Pending"     },
];

export default function DocumentFilters({
  search, onSearchChange,
  statusFilter, onStatusChange,
  counts,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">

      {/* Status tabs */}
      <div className="card flex items-center p-1 gap-0.5 shrink-0">
        {STATUS_TABS.map((tab) => {
          const active = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onStatusChange(tab.key)}
              className={cn(
                "flex justify-center items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all flex-1",
                active ? "bg-accent text-white shadow-sm" : "text-muted not-[]:hover:text-secondary hover:bg-hover"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "text-xs font-semibold px-1.5 py-0.5 rounded-full leading-none",
                  active ? "bg-accent-hover text-white/80" : "badge badge-neutral"
                )}
              >
                {counts[tab.key] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by VIN, vehicle, ADAS system, or record ID…"
          className="input-base pl-9 pr-9 py-2"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
}