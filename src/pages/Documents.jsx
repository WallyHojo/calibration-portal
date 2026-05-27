import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import DocumentFilters from "../components/documents/DocumentFilters";
import DocumentsTable  from "../components/documents/DocumentsTable";
import { documents }   from "../data/mockDocuments";

function matchesSearch(doc, term) {
  if (!term) return true;
  const q = term.toLowerCase();
  return (
    doc.id.toLowerCase().includes(q)          ||
    doc.vin.toLowerCase().includes(q)          ||
    doc.make.toLowerCase().includes(q)         ||
    doc.model.toLowerCase().includes(q)        ||
    doc.adasSystem.toLowerCase().includes(q)   ||
    doc.customer.toLowerCase().includes(q)     ||
    doc.technician.toLowerCase().includes(q)   ||
    String(doc.year).includes(q)
  );
}

export default function Documents() {
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const counts = useMemo(() => ({
    all:      documents.length,
    complete: documents.filter((d) => d.status === "complete").length,
    pending:  documents.filter((d) => d.status === "pending").length,
  }), []);

  const filtered = useMemo(() => documents.filter((doc) => {
    const statusMatch = statusFilter === "all" || doc.status === statusFilter;
    return statusMatch && matchesSearch(doc, search);
  }), [search, statusFilter]);

  return (
    <div className="space-y-5 max-w-screen-2xl mx-auto">
      <div className="page-header">
        <div>
          <h2 className="page-title">Calibration Records</h2>
          <p className="page-description">
            View and download ADAS calibration records across all customers and vehicles.
          </p>
        </div>
        <div className="card flex items-center gap-2 px-3 py-1.5">
          <FileText className="w-4 h-4 text-muted" />
          <span className="text-sm font-medium text-secondary">{documents.length} total</span>
        </div>
      </div>

      <DocumentFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        counts={counts}
      />

      <DocumentsTable records={filtered} />
    </div>
  );
}