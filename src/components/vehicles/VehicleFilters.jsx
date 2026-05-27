import { Search, X, ChevronDown } from "lucide-react";

function SelectFilter({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base appearance-none pl-3 pr-8 py-2 cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
    </div>
  );
}

export default function VehicleFilters({
  search, onSearchChange,
  customerFilter, onCustomerChange,
  adasFilter, onAdasChange,
  customerOptions, adasOptions,
  totalCount, filteredCount,
}) {
  const hasFilter = search || customerFilter || adasFilter;

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by VIN, make, model, or year…"
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

        {customerOptions.length > 0 && (
          <SelectFilter value={customerFilter} onChange={onCustomerChange} options={customerOptions} placeholder="All Customers" />
        )}
        <SelectFilter value={adasFilter} onChange={onAdasChange} options={adasOptions} placeholder="All ADAS Systems" />

        {hasFilter && (
          <button
            onClick={() => { onSearchChange(""); onCustomerChange(""); onAdasChange(""); }}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-secondary transition-colors whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {hasFilter && (
        <p className="text-xs text-muted">
          Showing {filteredCount} of {totalCount} vehicle{totalCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}