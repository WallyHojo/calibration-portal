import { useState } from "react";
import { SortIcon } from "../ui/Primitives";

function formatCurrency(val) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: 2,
  }).format(val);
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

function MarginBar({ margin }) {
  const color = margin >= 50 ? "var(--success-icon)"
              : margin >= 35 ? "var(--accent)"
              : "var(--warning-icon)";
  return (
    <div className="flex items-center gap-2">
      <div className="progress-track flex-1">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(margin, 100)}%`, backgroundColor: color }}
        />
      </div>
      <span className="font-mono text-xs text-muted w-10 text-right">{margin}%</span>
    </div>
  );
}

const COLUMNS = [
  { key: "id",         label: "Record ID",   sortable: true },
  { key: "date",       label: "Date",        sortable: true },
  { key: "vehicle",    label: "Vehicle",     sortable: true },
  { key: "adasSystem", label: "ADAS System", sortable: true },
  { key: "customer",   label: "Customer",    sortable: true },
  { key: "listPrice",  label: "List Price",  sortable: true },
  { key: "costPrice",  label: "Cost",        sortable: true },
  { key: "profit",     label: "Profit",      sortable: true },
  { key: "margin",     label: "Margin",      sortable: true },
];

function sortRecords(records, { key, dir }) {
  return [...records].sort((a, b) => {
    const A = a[key]; const B = b[key];
    if (A < B) return dir === "asc" ? -1 :  1;
    if (A > B) return dir === "asc" ?  1 : -1;
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
  const totals = records.reduce(
    (acc, r) => ({ listPrice: acc.listPrice + r.listPrice, costPrice: acc.costPrice + r.costPrice, profit: acc.profit + r.profit }),
    { listPrice: 0, costPrice: 0, profit: 0 }
  );
  const avgMargin = records.length
    ? parseFloat((records.reduce((s, r) => s + r.margin, 0) / records.length).toFixed(1))
    : 0;

  return (
    <div className="card overflow-hidden">
      <div className="card-header flex-col sm:flex-row items-start sm:items-center">
        <div>
          <h3 className="text-sm font-semibold text-primary">Profit Per Job</h3>
          <p className="text-xs text-muted mt-0.5">Click any column header to sort. Profit = List Price − Cost.</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={col.sortable ? "cursor-pointer select-none hover:text-primary" : ""}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon column={col.key} sort={sort} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id}>
                <td className="font-mono text-xs text-muted whitespace-nowrap">{r.id}</td>
                <td className="font-mono text-xs text-muted whitespace-nowrap">{formatDate(r.date)}</td>
                <td className="font-medium text-secondary whitespace-nowrap">{r.vehicle}</td>
                <td className="text-tertiary whitespace-nowrap">{r.adasSystem}</td>
                <td className="text-tertiary whitespace-nowrap">{r.customer}</td>
                <td className="font-mono text-xs text-tertiary whitespace-nowrap">{formatCurrency(r.listPrice)}</td>
                <td className="font-mono text-xs text-tertiary whitespace-nowrap">{formatCurrency(r.costPrice)}</td>
                <td className="font-mono text-xs font-semibold whitespace-nowrap" style={{ color: "var(--success-text)" }}>
                  {formatCurrency(r.profit)}
                </td>
                <td className="whitespace-nowrap min-w-30">
                  <MarginBar margin={r.margin} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="font-semibold text-muted uppercase tracking-wide text-xs">
                Totals — {records.length} jobs
              </td>
              <td className="font-mono text-xs font-semibold text-secondary">{formatCurrency(totals.listPrice)}</td>
              <td className="font-mono text-xs font-semibold text-secondary">{formatCurrency(totals.costPrice)}</td>
              <td className="font-mono text-xs font-bold" style={{ color: "var(--success-text)" }}>
                {formatCurrency(totals.profit)}
              </td>
              <td className="min-w-30"><MarginBar margin={avgMargin} /></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}