import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { pendingDocuments } from "../../data/mockDocuments";
import Badge from "../ui/Badge";

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

export default function PendingDocuments() {
  if (!pendingDocuments.length) {
    return (
      <div className="card p-6 text-center">
        <p className="text-sm text-muted">No pending calibrations.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="card-header">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-primary">Pending Records</h3>
          <span className="badge badge-warning">{pendingDocuments.length}</span>
        </div>
        <Link
          to="/documents"
          className="flex items-center gap-1 text-xs font-medium text-accent hover:opacity-80 transition-opacity"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <ul className="divide-y" style={{ borderColor: "var(--border-faint)" }}>
        {pendingDocuments.map((doc) => (
          <li key={doc.id} className="px-5 py-4 hover:bg-hover transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--warning-icon)" }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-secondary truncate">
                    {doc.year} {doc.make} {doc.model}
                  </p>
                  <Badge variant={doc.calibrationType === "Dynamic" ? "dynamic" : "static"}>
                    {doc.calibrationType}
                  </Badge>
                </div>
                <p className="text-xs text-muted mb-1 truncate">{doc.adasSystem}</p>
                <p className="text-xs text-muted truncate">
                  {doc.customer} &mdash; <span className="font-mono">{doc.id}</span>
                </p>
                {doc.notes && (
                  <p className="text-xs text-muted mt-1 italic truncate">{doc.notes}</p>
                )}
                <p className="text-xs text-muted mt-1">
                  Calibrated {formatDate(doc.calibrationDate)} &mdash; Tech: {doc.technician}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}