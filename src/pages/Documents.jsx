import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import DocumentFilters from "../components/documents/DocumentFilters";
import DocumentsTable from "../components/documents/DocumentsTable";
import { documents } from "../data/mockDocuments";

// ─── Search predicate ──────────────────────────────────────────────────────────
function matchesSearch(doc, term) {
  if (!term) return true;
  const q = term.toLowerCase();
  return (
    doc.id.toLowerCase().includes(q) ||
    doc.vin.toLowerCase().includes(q) ||
    doc.make.toLowerCase().includes(q) ||
    doc.model.toLowerCase().includes(q) ||
    doc.adasSystem.toLowerCase().includes(q) ||
    doc.customer.toLowerCase().includes(q) ||
    doc.technician.toLowerCase().includes(q) ||
    String(doc.year).includes(q)
  );
}

export default function Documents() {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Tab counts — always computed against the full set, ignoring search
  const counts = useMemo(() => ({
    all:      documents.length,
    complete: documents.filter((d) => d.status === "complete").length,
    pending:  documents.filter((d) => d.status === "pending").length,
  }), []);

  // Filtered records — apply both search and status filter
  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const statusMatch = statusFilter === "all" || doc.status === statusFilter;
      const searchMatch = matchesSearch(doc, search);
      return statusMatch && searchMatch;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-5 max-w-screen-2xl mx-auto">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-slate-800 text-lg font-semibold">Calibration Records</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            View and download ADAS calibration records across all customers and vehicles.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">
          <FileText className="w-4 h-4 text-slate-500" />
          <span className="text-slate-600 text-sm font-medium">{documents.length} total</span>
        </div>
      </div>

      {/* Filters */}
      <DocumentFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        counts={counts}
      />

      {/* Table */}
      <DocumentsTable records={filtered} />

    </div>
  );
}