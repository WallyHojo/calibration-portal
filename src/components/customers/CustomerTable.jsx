import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const typeConfig = {
  collision:  { label: "Collision Shop", className: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"      },
  dealership: { label: "Dealership",     className: "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800" },
};

const statusConfig = {
  active:   { label: "Active",   className: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
  inactive: { label: "Inactive", className: "bg-slate-100 dark:bg-slate-800  text-slate-500 dark:text-slate-500  border-slate-200 dark:border-slate-700"    },
};

function TypeBadge({ type }) {
  const cfg = typeConfig[type] ?? typeConfig.collision;
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] ?? statusConfig.active;
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

const COLUMNS = [
  { key: "name",                   label: "Customer",          sortable: true  },
  { key: "type",                   label: "Type",              sortable: true  },
  { key: "address",                label: "Location",          sortable: false },
  { key: "contact",                label: "Contact",           sortable: false },
  { key: "totalCalibrations",      label: "Total Records",     sortable: true  },
  { key: "calibrationsThisMonth",  label: "This Month",        sortable: true  },
  { key: "lastActivity",           label: "Last Activity",     sortable: true  },
  { key: "status",                 label: "Status",            sortable: true  },
];

function SortIcon({ column, sort }) {
  if (sort.key !== column)
    return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />;
  return sort.dir === "asc"
    ? <ChevronUp   className="w-3.5 h-3.5 text-blue-500" />
    : <ChevronDown className="w-3.5 h-3.5 text-blue-500" />;
}

function sortCustomers(customers, { key, dir }) {
  return [...customers].sort((a, b) => {
    const valA = a[key] ?? "";
    const valB = b[key] ?? "";
    if (valA < valB) return dir === "asc" ? -1 :  1;
    if (valA > valB) return dir === "asc" ?  1 : -1;
    return 0;
  });
}

export default function CustomerTable({ customers }) {
  const [sort, setSort] = useState({ key: "name", dir: "asc" });

  function handleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  }

  const sorted = sortCustomers(customers, sort);

  if (!sorted.length) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm px-6 py-16 text-center">
        <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">No customers match your search.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={[
                    "text-left text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wide px-5 py-3 whitespace-nowrap",
                    col.sortable ? "cursor-pointer select-none hover:text-slate-700 dark:text-slate-200" : "",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon column={col.key} sort={sort} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sorted.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors">
                <td className="px-5 py-3.5">
                  <p className="text-slate-700 dark:text-slate-200 font-semibold text-sm">{c.name}</p>
                  {c.franchiseBrand && (
                    <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">{c.franchiseBrand} Franchise</p>
                  )}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <TypeBadge type={c.type} />
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-500 whitespace-nowrap text-xs">
                  {c.address.city}, {c.address.state} {c.address.zip}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <p className="text-slate-700 dark:text-slate-200 text-xs font-medium">{c.contact.name}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs">{c.contact.title}</p>
                </td>
                <td className="px-5 py-3.5 font-mono text-sm font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  {c.totalCalibrations}
                </td>
                <td className="px-5 py-3.5 font-mono text-sm text-slate-600 dark:text-slate-500 whitespace-nowrap">
                  {c.calibrationsThisMonth}
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-500 whitespace-nowrap">
                  {formatDate(c.lastActivity)}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <StatusBadge status={c.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {sorted.length} customer{sorted.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}