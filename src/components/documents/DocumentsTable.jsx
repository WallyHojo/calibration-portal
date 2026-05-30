import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Download } from "lucide-react";
import Badge from "../ui/Badge";
import { SortIcon } from "../ui/Primitives";

const STATUS_ORDER = { pending: 0, complete: 1 };

const COLUMNS = [
  { key: "id",              label: "Record ID",   sortable: true  },
  { key: "vehicle",         label: "Vehicle",     sortable: true  },
  { key: "adasSystem",      label: "ADAS System", sortable: true  },
  { key: "customer",        label: "Customer",    sortable: true  },
  { key: "calibrationDate", label: "Date",        sortable: true  },
  { key: "calibrationType", label: "Type",        sortable: true  },
  { key: "status",          label: "Status",      sortable: true  },
  { key: "actions",         label: "",            sortable: false },
];

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

function sortRecords(records, { key, dir }) {
  return [...records].sort((a, b) => {
    let valA = key === "status"  ? STATUS_ORDER[a[key]] ?? 99
             : key === "vehicle" ? `${a.year} ${a.make} ${a.model}`
             : a[key];
    let valB = key === "status"  ? STATUS_ORDER[b[key]] ?? 99
             : key === "vehicle" ? `${b.year} ${b.make} ${b.model}`
             : b[key];
    if (valA < valB) return dir === "asc" ? -1 : 1;
    if (valA > valB) return dir === "asc" ?  1 : -1;
    return 0;
  });
}

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

  if (!sorted.length) {
    return (
      <div className="card px-6 py-16 text-center">
        <p className="text-sm font-medium text-secondary">No records match your search.</p>
        <p className="text-xs text-muted mt-1">Try adjusting your filters or search term.</p>
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
            {sorted.map((doc) => (
              <tr key={doc.id} className="">
                <td className="font-mono text-xs text-muted whitespace-nowrap">{doc.id}</td>
                <td className="whitespace-nowrap">
                  <p className="font-medium text-secondary">{doc.year} {doc.make} {doc.model}</p>
                  <p className="font-mono text-xs text-muted mt-0.5">{doc.vin}</p>
                </td>
                <td className="whitespace-nowrap text-tertiary">{doc.adasSystem}</td>
                <td className="whitespace-nowrap text-tertiary">{doc.customer}</td>
                <td className="font-mono text-xs text-muted whitespace-nowrap">{formatDate(doc.calibrationDate)}</td>
                <td className="whitespace-nowrap">
                  <Badge variant={doc.calibrationType === "Dynamic" ? "dynamic" : "static"}>
                    {doc.calibrationType}
                  </Badge>
                </td>
                <td className="whitespace-nowrap">
                  <Badge variant={doc.status}>{doc.status === "complete" ? "Complete" : "Pending"}</Badge>
                </td>
                <td className="whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/documents/${doc.id}`}
                      className="flex items-center gap-1 text-xs font-medium text-accent px-2.5 py-1.5 rounded-lg hover:bg-accent-subtle transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View
                    </Link>
                    <button className="flex items-center gap-1 text-xs font-medium text-tertiary px-2.5 py-1.5 rounded-lg hover:bg-hover transition-colors">
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <p className="text-xs text-muted">{sorted.length} record{sorted.length !== 1 ? "s" : ""}</p>
      </div>
    </div>
  );
}