import { Link } from "react-router-dom";
import { Car, Building2, Cpu, ExternalLink, Download, CalendarDays, User } from "lucide-react";
import Badge from "../ui/Badge";

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

export default function DocumentCard({ doc }) {
  return (
    <div className="card overflow-hidden flex flex-col">

      {/* Header */}
      <div className="card-header">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--surface-inset)" }}
          >
            <Car className="w-4 h-4 text-muted" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-primary leading-tight truncate">
              {doc.year} {doc.make} {doc.model}
            </p>
            <p className="font-mono text-xs text-muted mt-0.5 truncate">{doc.vin}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
          <Badge variant={doc.calibrationType === "Dynamic" ? "dynamic" : "static"}>
            {doc.calibrationType}
          </Badge>
          <Badge variant={doc.status}>
            {doc.status === "complete" ? "Complete" : "Pending"}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="card-body flex-1 space-y-3">
        <div className="flex items-start gap-2 text-xs text-tertiary">
          <Cpu className="w-3.5 h-3.5 shrink-0 mt-0.5 text-disabled" />
          <span className="leading-tight">{doc.adasSystem}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-tertiary">
          <Building2 className="w-3.5 h-3.5 shrink-0 text-disabled" />
          <span className="truncate">{doc.customer}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-tertiary">
          <CalendarDays className="w-3.5 h-3.5 shrink-0 text-disabled" />
          <span>{formatDate(doc.calibrationDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-tertiary">
          <User className="w-3.5 h-3.5 shrink-0 text-disabled" />
          <span>{doc.technician}</span>
        </div>
      </div>

      {/* Footer — always visible actions */}
      <div
        className="px-5 py-3 border-t flex items-center justify-between gap-2"
        style={{ borderColor: "var(--border-faint)", backgroundColor: "var(--surface-subtle)" }}
      >
        <p className="font-mono text-xs text-muted truncate">{doc.id}</p>
        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            to={`/documents/${doc.id}`}
            className="flex items-center gap-1 text-xs font-medium text-accent px-2.5 py-1.5 rounded-lg hover:bg-accent-subtle transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View
          </Link>
          <button className="flex items-center gap-1 text-xs font-medium text-tertiary px-2.5 py-1.5 rounded-lg hover:bg-hover transition-colors">
            <Download className="w-3.5 h-3.5" />
            PDF
          </button>
        </div>
      </div>

    </div>
  );
}
