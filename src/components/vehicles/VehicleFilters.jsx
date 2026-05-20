import { Search, X, ChevronDown } from "lucide-react";

function SelectFilter({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-lg shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
    </div>
  );
}

export default function VehicleFilters({
  search,
  onSearchChange,
  customerFilter,
  onCustomerChange,
  adasFilter,
  onAdasChange,
  customerOptions,
  adasOptions,
  totalCount,
  filteredCount,
}) {
  const hasActiveFilter = search || customerFilter || adasFilter;

  function clearAll() {
    onSearchChange("");
    onCustomerChange("");
    onAdasChange("");
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by VIN, make, model, or year…"
            className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-slate-200 rounded-lg shadow-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Customer filter */}
        <SelectFilter
          value={customerFilter}
          onChange={onCustomerChange}
          placeholder="All Customers"
          options={customerOptions}
        />

        {/* ADAS system filter */}
        <SelectFilter
          value={adasFilter}
          onChange={onAdasChange}
          placeholder="All ADAS Systems"
          options={adasOptions}
        />

        {/* Clear all */}
        {hasActiveFilter && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Result count */}
      {hasActiveFilter && (
        <p className="text-xs text-slate-400">
          Showing {filteredCount} of {totalCount} vehicle{totalCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}