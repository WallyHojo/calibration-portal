import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Download,
  ExternalLink,
} from "lucide-react";

// ─── Status badge ──────────────────────────────────────────────────────────────
const statusConfig = {
  complete: { label: "Complete", className: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
  pending:  { label: "Pending",  className: "bg-amber-50 dark:bg-amber-950/30  text-amber-700 dark:text-amber-300  border-amber-200 dark:border-amber-800"  },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] ?? statusConfig.complete;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

// ─── Calibration type badge ────────────────────────────────────────────────────
const typeConfig = {
  Static:  { className: "bg-slate-50 dark:bg-slate-800/50  text-slate-600 dark:text-slate-500  border-slate-200 dark:border-slate-700"  },
  Dynamic: { className: "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800" },
};

function TypeBadge({ type }) {
  const cfg = typeConfig[type] ?? typeConfig.Static;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${cfg.className}`}>
      {type}
    </span>
  );
}

// ─── Sort helpers ──────────────────────────────────────────────────────────────
const STATUS_ORDER = { pending: 0, complete: 1 };

function sortRecords(records, { key, dir }) {
  return [...records].sort((a, b) => {
    let valA = a[key];
    let valB = b[key];

    // Status sorts by custom order
    if (key === "status") {
      valA = STATUS_ORDER[valA] ?? 99;
      valB = STATUS_ORDER[valB] ?? 99;
    }

    // Vehicle label sorts by make
    if (key === "vehicle") {
      valA = `${a.year} ${a.make} ${a.model}`;
      valB = `${b.year} ${b.make} ${b.model}`;
    }

    if (valA < valB) return dir === "asc" ? -1 : 1;
    if (valA > valB) return dir === "asc" ? 1 : -1;
    return 0;
  });
}

// ─── Sort icon ─────────────────────────────────────────────────────────────────
function SortIcon({ column, sort }) {
  if (sort.key !== column) return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />;
  return sort.dir === "asc"
    ? <ChevronUp   className="w-3.5 h-3.5 text-blue-500" />
    : <ChevronDown className="w-3.5 h-3.5 text-blue-500" />;
}

// ─── Format date ───────────────────────────────────────────────────────────────
function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

// ─── Column definitions ────────────────────────────────────────────────────────
const COLUMNS = [
  { key: "id",              label: "Record ID",    sortable: true  },
  { key: "vehicle",         label: "Vehicle",      sortable: true  },
  { key: "adasSystem",      label: "ADAS System",  sortable: true  },
  { key: "customer",        label: "Customer",     sortable: true  },
  { key: "calibrationDate", label: "Date",         sortable: true  },
  { key: "calibrationType", label: "Type",         sortable: true  },
  { key: "status",          label: "Status",       sortable: true  },
  { key: "actions",         label: "",             sortable: false },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DocumentsTable({ records }) {
  const [sort, setSort] = useState({ key: "status", dir: "asc" });

  function handleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  }

  const sorted = sortRecords(records, sort);

  if (sorted.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm px-6 py-16 text-center">
        <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">No records match your search.</p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Header */}
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={[
                    "text-left text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wide px-5 py-3 whitespace-nowrap",
                    col.sortable ? "cursor-pointer select-none hover:text-slate-700 dark:text-slate-200" : "",
                  ].join(" ")}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon column={col.key} sort={sort} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sorted.map((doc) => (
              <tr
                key={doc.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors group"
              >
                {/* Record ID */}
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-500">{doc.id}</span>
                </td>

                {/* Vehicle */}
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <p className="text-slate-700 dark:text-slate-200 font-medium text-sm">
                    {doc.year} {doc.make} {doc.model}
                  </p>
                  <p className="font-mono text-xs text-slate-400 dark:text-slate-500 mt-0.5">{doc.vin}</p>
                </td>

                {/* ADAS System */}
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-500 whitespace-nowrap">
                  {doc.adasSystem}
                </td>

                {/* Customer */}
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-500 whitespace-nowrap">
                  {doc.customer}
                </td>

                {/* Date */}
                <td className="px-5 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-500 whitespace-nowrap">
                  {formatDate(doc.calibrationDate)}
                </td>

                {/* Type */}
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <TypeBadge type={doc.calibrationType} />
                </td>

                {/* Status */}
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <StatusBadge status={doc.status} />
                </td>

                {/* Actions */}
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/documents/${doc.id}`}
                      className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 dark:bg-blue-950/30 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View
                    </Link>
                    <button className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {sorted.length} record{sorted.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}