import { useState, useMemo } from "react";
import { Search, X, Users } from "lucide-react";
import { useAuth }           from "../hooks/useAuth";
import { useCustomerScope }  from "../hooks/useCustomerScope";
import { customers }         from "../data/mockCustomers";
import CustomerCard          from "../components/customers/CustomerCard";
import CustomerTable         from "../components/customers/CustomerTable";
import CustomerProfile       from "../components/customers/CustomerProfile";
import { ViewToggle }        from "../components/ui/primitives";
import { cn }                from "../lib/cn";

const TYPE_TABS = [
  { key: "all",        label: "All"            },
  { key: "collision",  label: "Collision Shops" },
  { key: "dealership", label: "Dealerships"     },
];

function AdminDirectory() {
  const [view,       setView]       = useState("grid");
  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const counts = useMemo(() => ({
    all:        customers.length,
    collision:  customers.filter((c) => c.type === "collision").length,
    dealership: customers.filter((c) => c.type === "dealership").length,
  }), []);

  const filtered = useMemo(() => customers.filter((c) => {
    const typeMatch = typeFilter === "all" || c.type === typeFilter;
    if (!search.trim()) return typeMatch;
    const q = search.toLowerCase();
    return typeMatch && (
      c.name.toLowerCase().includes(q)                          ||
      c.address.city.toLowerCase().includes(q)                  ||
      c.address.state.toLowerCase().includes(q)                 ||
      c.contact.name.toLowerCase().includes(q)                  ||
      c.contact.email.toLowerCase().includes(q)                 ||
      (c.franchiseBrand ?? "").toLowerCase().includes(q)        ||
      (c.drp ?? []).some((d) => d.toLowerCase().includes(q))
    );
  }), [search, typeFilter]);

  return (
    <div className="space-y-5 max-w-screen-2xl mx-auto">

      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Customers</h2>
          <p className="page-description">All body shops and dealerships with access to the portal.</p>
        </div>
        <div className="card flex items-center gap-2 px-3 py-1.5">
          <Users className="w-4 h-4 text-muted" />
          <span className="text-sm font-medium text-secondary">{customers.length} total</span>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

        {/* Type tabs */}
        <div className="card flex items-center p-1 gap-0.5 shrink-0">
          {TYPE_TABS.map((tab) => {
            const active = typeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setTypeFilter(tab.key)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                  active ? "bg-accent text-white shadow-sm" : "text-muted hover:text-secondary hover:bg-hover"
                )}
              >
                {tab.label}
                <span className={cn(
                  "text-xs font-semibold px-1.5 py-0.5 rounded-full leading-none",
                  active ? "bg-accent-hover text-white/80" : "badge badge-neutral"
                )}>
                  {counts[tab.key]}
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, city, contact, DRP network…"
            className="input-base pl-9 pr-9 py-2"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <ViewToggle view={view} onChange={setView} />
      </div>

      {/* Grid view */}
      {view === "grid" && (
        filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filtered.map((c) => <CustomerCard key={c.id} customer={c} />)}
          </div>
        ) : (
          <div className="card px-6 py-16 text-center">
            <p className="text-sm font-medium text-secondary">No customers match your search.</p>
          </div>
        )
      )}

      {/* List view */}
      {view === "list" && <CustomerTable customers={filtered} />}
    </div>
  );
}

function CustomerSelfView() {
  const { customer } = useCustomerScope();

  if (!customer) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <div className="empty-state">
          <p className="text-sm font-medium text-secondary">Your account is not linked to a customer record.</p>
          <p className="text-xs text-muted mt-1">Please contact your administrator.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto space-y-5">
      <div>
        <h2 className="page-title">Your Account</h2>
        <p className="page-description">Profile, contact information, and calibration summary for your shop.</p>
      </div>
      <CustomerProfile customer={customer} />
    </div>
  );
}

export default function Customers() {
  const { isAdmin } = useAuth();
  return isAdmin ? <AdminDirectory /> : <CustomerSelfView />;
}