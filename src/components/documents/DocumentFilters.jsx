import { Search, X } from "lucide-react";

const STATUS_TABS = [
  { key: "all",      label: "All Records" },
  { key: "complete", label: "Complete"    },
  { key: "pending",  label: "Pending"     },
];

export default function DocumentFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  counts,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">

      {/* Status tabs */}
      <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1 gap-0.5 shadow-sm shrink-0">
        {STATUS_TABS.map((tab) => {
          const count = counts[tab.key] ?? 0;
          const active = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onStatusChange(tab.key)}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                active
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50",
              ].join(" ")}
            >
              {tab.label}
              <span
                className={[
                  "text-xs font-semibold px-1.5 py-0.5 rounded-full leading-none",
                  active
                    ? "bg-blue-500 text-blue-100"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500",
                ].join(" ")}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by VIN, vehicle, ADAS system, or record ID…"
          className="w-full pl-9 pr-9 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-400 dark:focus:border-blue-600 transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600  transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
}