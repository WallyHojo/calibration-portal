import { useState, useMemo } from "react";
import { Car } from "lucide-react";
import { useAuth }          from "../hooks/useAuth";
import { useCustomerScope } from "../hooks/useCustomerScope";
import {
  vehicles, getVehiclesByCustomer, adasSystemOptions,
} from "../data/mockVehicles";
import VehicleCard    from "../components/vehicles/VehicleCard";
import VehicleFilters from "../components/vehicles/VehicleFilters";

function filterVehicles(list, { search, customerFilter, adasFilter }) {
  return list.filter((v) => {
    const matchesCustomer = !customerFilter || v.customerId === customerFilter;
    const matchesAdas     = !adasFilter || v.records.some((r) => r.adasSystem === adasFilter);
    if (!search.trim()) return matchesCustomer && matchesAdas;
    const q = search.toLowerCase();
    return matchesCustomer && matchesAdas && (
      v.vin.toLowerCase().includes(q)      ||
      v.make.toLowerCase().includes(q)     ||
      v.model.toLowerCase().includes(q)    ||
      String(v.year).includes(q)           ||
      v.customer.toLowerCase().includes(q) ||
      v.records.some((r) => r.id.toLowerCase().includes(q))
    );
  });
}

function VehicleDirectory({ sourceVehicles, showCustomerFilter = true }) {
  const [search,         setSearch]         = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [adasFilter,     setAdasFilter]     = useState("");

  const filtered = useMemo(
    () => filterVehicles(sourceVehicles, { search, customerFilter, adasFilter }),
    [sourceVehicles, search, customerFilter, adasFilter]
  );

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
          {filtered.map((v) => <VehicleCard key={v.vin} vehicle={v} />)}
        </div>
      ) : (
        <div className="card px-6 py-16 text-center">
          <p className="text-sm font-medium text-secondary">No vehicles match your search.</p>
          <p className="text-xs text-muted mt-1">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

export default function Vehicles() {
  const { isAdmin }    = useAuth();
  const { customerId } = useCustomerScope();

  const scopedVehicles = isAdmin
    ? vehicles
    : getVehiclesByCustomer(customerId ?? "");

  return (
    <div className="space-y-5 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row page-header">
        <div>
          <h2 className="page-title">Vehicles</h2>
          <p className="page-description">
            {isAdmin
              ? "All vehicles serviced across every customer."
              : "Vehicles associated with your account."}
          </p>
        </div>
        <div className="card flex items-center gap-2 px-3 py-1.5">
          <Car className="w-4 h-4 text-muted" />
          <span className="text-sm font-medium text-secondary">
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