import { useState } from "react";
import Badge from "../ui/Badge";
import { SortIcon } from "../ui/primitives";

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

const COLUMNS = [
  { key: "name",                  label: "Customer",     sortable: true  },
  { key: "type",                  label: "Type",         sortable: true  },
  { key: "address",               label: "Location",     sortable: false },
  { key: "contact",               label: "Contact",      sortable: false },
  { key: "totalCalibrations",     label: "Total",        sortable: true  },
  { key: "calibrationsThisMonth", label: "This Month",   sortable: true  },
  { key: "lastActivity",          label: "Last Active",  sortable: true  },
  { key: "status",                label: "Status",       sortable: true  },
];

function sortCustomers(list, { key, dir }) {
  return [...list].sort((a, b) => {
    const A = a[key] ?? ""; const B = b[key] ?? "";
    if (A < B) return dir === "asc" ? -1 :  1;
    if (A > B) return dir === "asc" ?  1 : -1;
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
      <div className="card px-6 py-16 text-center">
        <p className="text-sm font-medium text-secondary">No customers match your search.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
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
            {sorted.map((c) => (
              <tr key={c.id}>
                <td>
                  <p className="font-semibold text-secondary">{c.name}</p>
                  {c.franchiseBrand && <p className="text-xs text-muted mt-0.5">{c.franchiseBrand} Franchise</p>}
                </td>
                <td><Badge variant={c.type}>{c.type === "collision" ? "Collision Shop" : "Dealership"}</Badge></td>
                <td className="text-xs text-tertiary whitespace-nowrap">{c.address.city}, {c.address.state} {c.address.zip}</td>
                <td>
                  <p className="text-xs font-medium text-secondary">{c.contact.name}</p>
                  <p className="text-xs text-muted">{c.contact.title}</p>
                </td>
                <td className="font-mono text-sm font-semibold text-secondary">{c.totalCalibrations}</td>
                <td className="font-mono text-sm text-tertiary">{c.calibrationsThisMonth}</td>
                <td className="font-mono text-xs text-muted whitespace-nowrap">{formatDate(c.lastActivity)}</td>
                <td><Badge variant={c.status}>{c.status === "active" ? "Active" : "Inactive"}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <p className="text-xs text-muted">{sorted.length} customer{sorted.length !== 1 ? "s" : ""}</p>
      </div>
    </div>
  );
}