import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

function formatCurrency(val) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(val);
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

function MarginBar({ margin }) {
  const color =
    margin >= 50 ? "bg-emerald-400" :
    margin >= 35 ? "bg-blue-400"    :
                   "bg-amber-400";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${Math.min(margin, 100)}%` }}
        />
      </div>
      <span className="font-mono text-xs text-slate-500 w-10 text-right">
        {margin}%
      </span>
    </div>
  );
}

const COLUMNS = [
  { key: "id",         label: "Record ID",    sortable: true  },
  { key: "date",       label: "Date",         sortable: true  },
  { key: "vehicle",    label: "Vehicle",      sortable: true  },
  { key: "adasSystem", label: "ADAS System",  sortable: true  },
  { key: "customer",   label: "Customer",     sortable: true  },
  { key: "listPrice",  label: "List Price",   sortable: true  },
  { key: "costPrice",  label: "Cost",         sortable: true  },
  { key: "profit",     label: "Profit",       sortable: true  },
  { key: "margin",     label: "Margin",       sortable: true  },
];

function SortIcon({ column, sort }) {
  if (sort.key !== column)
    return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-300" />;
  return sort.dir === "asc"
    ? <ChevronUp   className="w-3.5 h-3.5 text-blue-500" />
    : <ChevronDown className="w-3.5 h-3.5 text-blue-500" />;
}

function sortRecords(records, { key, dir }) {
  return [...records].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    if (valA < valB) return dir === "asc" ? -1 : 1;
    if (valA > valB) return dir === "asc" ? 1  : -1;
    return 0;
  });
}

export default function ProfitTable({ records }) {
  const [sort, setSort] = useState({ key: "profit", dir: "desc" });

  function handleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" }
    );
  }

  const sorted = sortRecords(records, sort);

  // Totals row
  const totals = records.reduce(
    (acc, r) => ({
      listPrice: acc.listPrice + r.listPrice,
      costPrice: acc.costPrice + r.costPrice,
      profit:    acc.profit    + r.profit,
    }),
    { listPrice: 0, costPrice: 0, profit: 0 }
  );
  const avgMargin = records.length
    ? parseFloat((records.reduce((s, r) => s + r.margin, 0) / records.length).toFixed(1))
    : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-slate-800 font-semibold text-sm">Profit Per Job</h3>
        <p className="text-slate-400 text-xs mt-0.5">
          Click any column header to sort. Profit = List Price − Cost.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={[
                    "text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 whitespace-nowrap",
                    col.sortable ? "cursor-pointer select-none hover:text-slate-700" : "",
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

          <tbody className="divide-y divide-slate-100">
            {sorted.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3.5 font-mono text-xs text-slate-500 whitespace-nowrap">
                  {r.id}
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-slate-500 whitespace-nowrap">
                  {formatDate(r.date)}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <p className="text-slate-700 font-medium">{r.vehicle}</p>
                </td>
                <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
                  {r.adasSystem}
                </td>
                <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
                  {r.customer}
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-slate-600 whitespace-nowrap">
                  {formatCurrency(r.listPrice)}
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-slate-600 whitespace-nowrap">
                  {formatCurrency(r.costPrice)}
                </td>
                <td className="px-5 py-3.5 font-mono text-xs font-semibold text-emerald-700 whitespace-nowrap">
                  {formatCurrency(r.profit)}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap min-w-[120px]">
                  <MarginBar margin={r.margin} />
                </td>
              </tr>
            ))}
          </tbody>

          {/* Totals row */}
          <tfoot>
            <tr className="border-t-2 border-slate-200 bg-slate-50">
              <td colSpan={5} className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Totals — {records.length} jobs
              </td>
              <td className="px-5 py-3 font-mono text-xs font-semibold text-slate-700">
                {formatCurrency(totals.listPrice)}
              </td>
              <td className="px-5 py-3 font-mono text-xs font-semibold text-slate-700">
                {formatCurrency(totals.costPrice)}
              </td>
              <td className="px-5 py-3 font-mono text-xs font-bold text-emerald-700">
                {formatCurrency(totals.profit)}
              </td>
              <td className="px-5 py-3">
                <MarginBar margin={avgMargin} />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}