import { useState, useMemo } from "react";
import { Car } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useCustomerScope } from "../hooks/useCustomerScope";
import {
  vehicles,
  getVehiclesByCustomer,
  adasSystemOptions,
} from "../data/mockVehicles";
import VehicleCard from "../components/vehicles/VehicleCard";
import VehicleFilters from "../components/vehicles/VehicleFilters";

// ─── Filter logic ──────────────────────────────────────────────────────────────
function filterVehicles(list, { search, customerFilter, adasFilter }) {
  return list.filter((v) => {
    const matchesCustomer = !customerFilter || v.customerId === customerFilter;
    const matchesAdas     = !adasFilter ||
      v.records.some((r) => r.adasSystem === adasFilter);

    if (!search.trim()) return matchesCustomer && matchesAdas;

    const q = search.toLowerCase();
    const matchesSearch =
      v.vin.toLowerCase().includes(q)                    ||
      v.make.toLowerCase().includes(q)                   ||
      v.model.toLowerCase().includes(q)                  ||
      String(v.year).includes(q)                         ||
      v.customer.toLowerCase().includes(q)               ||
      v.records.some((r) => r.id.toLowerCase().includes(q));

    return matchesCustomer && matchesAdas && matchesSearch;
  });
}

// ─── Shared directory shell ────────────────────────────────────────────────────
function VehicleDirectory({ sourceVehicles, showCustomerFilter = true }) {
  const [search,         setSearch]         = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [adasFilter,     setAdasFilter]     = useState("");

  const filtered = useMemo(
    () => filterVehicles(sourceVehicles, { search, customerFilter, adasFilter }),
    [sourceVehicles, search, customerFilter, adasFilter]
  );

  // Build customer options from the vehicles in scope
  const customerOptions = useMemo(() => {
    const unique = [...new Map(
      sourceVehicles.map((v) => [v.customerId, { value: v.customerId, label: v.customer }])
    ).values()];
    return unique.sort((a, b) => a.label.localeCompare(b.label));
  }, [sourceVehicles]);

  const adasOptions = adasSystemOptions.map((s) => ({ value: s, label: s }));

  return (
    <div className="space-y-5">
      <VehicleFilters
        search={search}
        onSearchChange={setSearch}
        customerFilter={customerFilter}
        onCustomerChange={setCustomerFilter}
        adasFilter={adasFilter}
        onAdasChange={setAdasFilter}
        customerOptions={showCustomerFilter ? customerOptions : []}
        adasOptions={adasOptions}
        totalCount={sourceVehicles.length}
        filteredCount={filtered.length}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map((v) => (
            <VehicleCard key={v.vin} vehicle={v} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-16 text-center">
          <p className="text-slate-500 text-sm font-medium">No vehicles match your search.</p>
          <p className="text-slate-400 text-xs mt-1">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Vehicles() {
  const { isAdmin }    = useAuth();
  const { customerId } = useCustomerScope();

  const scopedVehicles = isAdmin
    ? vehicles
    : getVehiclesByCustomer(customerId ?? "");

  return (
    <div className="space-y-5 max-w-screen-2xl mx-auto">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-slate-800 text-lg font-semibold">Vehicles</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {isAdmin
              ? "All vehicles serviced across every customer."
              : "Vehicles associated with your account."}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">
          <Car className="w-4 h-4 text-slate-500" />
          <span className="text-slate-600 text-sm font-medium">
            {scopedVehicles.length} vehicle{scopedVehicles.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <VehicleDirectory
        sourceVehicles={scopedVehicles}
        showCustomerFilter={isAdmin}
      />
    </div>
  );
}