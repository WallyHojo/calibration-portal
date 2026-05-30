import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import DocumentFilters from "../components/documents/DocumentFilters";
import DocumentsTable  from "../components/documents/DocumentsTable";
import DocumentCard    from "../components/documents/DocumentCard";
import { ViewToggle }  from "../components/ui/Primitives";
import { documents }   from "../data/mockDocuments";
import { useAuth }          from "../hooks/useAuth";
import { useCustomerScope } from "../hooks/useCustomerScope";

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
  const { isAdmin }              = useAuth();
  const { customerId, isScoped } = useCustomerScope();

  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view,         setView]         = useState("list");

  // Scope source records to the logged-in customer if not admin
  const sourceDocuments = useMemo(() =>
    isScoped && customerId
      ? documents.filter((d) => d.customerId === customerId)
      : documents,
    [isScoped, customerId]
  );

  const counts = useMemo(() => ({
    all:      sourceDocuments.length,
    complete: sourceDocuments.filter((d) => d.status === "complete").length,
    pending:  sourceDocuments.filter((d) => d.status === "pending").length,
  }), [sourceDocuments]);

  const filtered = useMemo(() => sourceDocuments.filter((doc) => {
    const statusMatch = statusFilter === "all" || doc.status === statusFilter;
    return statusMatch && matchesSearch(doc, search);
  }), [sourceDocuments, search, statusFilter]);

  return (
    <div className="space-y-5 max-w-screen-2xl mx-auto">

      {/* Page header */}
      <div className="flex flex-col md:flex-row page-header">
        <div>
          <h2 className="page-title">Calibration Records</h2>
          <p className="page-description">
            {isAdmin
              ? "View and download ADAS calibration records across all customers and vehicles."
              : "View and download calibration records for your account."}
          </p>
        </div>
        <div className="card flex items-center gap-2 px-3 py-1.5">
          <FileText className="w-4 h-4 text-muted" />
          <span className="text-sm font-medium text-secondary">
            {sourceDocuments.length} total
          </span>
        </div>
      </div>

      {/* Filters + view toggle */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="flex-1 min-w-0">
          <DocumentFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            counts={counts}
          />
        </div>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="card px-6 py-16 text-center">
          <p className="text-sm font-medium text-secondary">No records match your search.</p>
          <p className="text-xs text-muted mt-1">Try adjusting your filters or search term.</p>
        </div>
      )}

      {/* List view */}
      {view === "list" && filtered.length > 0 && (
        <DocumentsTable records={filtered} />
      )}

      {/* Grid view */}
      {view === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}

    </div>
  );
}