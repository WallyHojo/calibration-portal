import { useState, useMemo } from "react";
import { Search, X, Users } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useCustomerScope } from "../hooks/useCustomerScope";
import { customers } from "../data/mockCustomers";
import CustomerCard from "../components/customers/CustomerCard";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerProfile from "../components/customers/CustomerProfile";
import CustomerViewToggle from "../components/customers/CustomerViewToggle";

// ─── Type filter tabs ──────────────────────────────────────────────────────────
const TYPE_TABS = [
  { key: "all",        label: "All"            },
  { key: "collision",  label: "Collision Shops" },
  { key: "dealership", label: "Dealerships"     },
];

// ─── Admin directory view ──────────────────────────────────────────────────────
function AdminDirectory() {
  const [view,       setView]       = useState("grid");
  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const counts = useMemo(() => ({
    all:        customers.length,
    collision:  customers.filter((c) => c.type === "collision").length,
    dealership: customers.filter((c) => c.type === "dealership").length,
  }), []);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const typeMatch = typeFilter === "all" || c.type === typeFilter;
      if (!search.trim()) return typeMatch;
      const q = search.toLowerCase();
      return typeMatch && (
        c.name.toLowerCase().includes(q) ||
        c.address.city.toLowerCase().includes(q) ||
        c.address.state.toLowerCase().includes(q) ||
        c.contact.name.toLowerCase().includes(q) ||
        c.contact.email.toLowerCase().includes(q) ||
        (c.franchiseBrand ?? "").toLowerCase().includes(q) ||
        (c.drp ?? []).some((d) => d.toLowerCase().includes(q))
      );
    });
  }, [search, typeFilter]);

  return (
    <div className="space-y-5 max-w-screen-2xl mx-auto">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-slate-800 text-lg font-semibold">Customers</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            All body shops and dealerships with access to the portal.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">
          <Users className="w-4 h-4 text-slate-500" />
          <span className="text-slate-600 text-sm font-medium">{customers.length} total</span>
        </div>
      </div>

      {/* Filters + toggle row */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

        {/* Type tabs */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 gap-0.5 shadow-sm shrink-0">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTypeFilter(tab.key)}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                typeFilter === tab.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              {tab.label}
              <span className={[
                "text-xs font-semibold px-1.5 py-0.5 rounded-full leading-none",
                typeFilter === tab.key
                  ? "bg-blue-500 text-blue-100"
                  : "bg-slate-100 text-slate-500",
              ].join(" ")}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, city, contact, DRP network…"
            className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-slate-200 rounded-lg shadow-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View toggle */}
        <CustomerViewToggle view={view} onChange={setView} />
      </div>

      {/* Grid view */}
      {view === "grid" && (
        filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filtered.map((c) => (
              <CustomerCard key={c.id} customer={c} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-16 text-center">
            <p className="text-slate-500 text-sm font-medium">No customers match your search.</p>
          </div>
        )
      )}

      {/* List view */}
      {view === "list" && (
        <CustomerTable customers={filtered} />
      )}

    </div>
  );
}

// ─── Customer self-view ────────────────────────────────────────────────────────
function CustomerSelfView() {
  const { customer } = useCustomerScope();

  if (!customer) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Your account is not linked to a customer record.
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Please contact your administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto space-y-1">
      <div className="mb-5">
        <h2 className="text-slate-800 text-lg font-semibold">Your Account</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Profile, contact information, and calibration summary for your shop.
        </p>
      </div>
      <CustomerProfile customer={customer} />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Customers() {
  const { isAdmin } = useAuth();
  return isAdmin ? <AdminDirectory /> : <CustomerSelfView />;
}