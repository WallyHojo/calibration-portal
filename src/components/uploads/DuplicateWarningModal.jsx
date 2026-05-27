import { AlertTriangle, X, Upload, Ban } from "lucide-react";
import Button from "../ui/Button";

export default function DuplicateWarningModal({ duplicates, onOverwrite, onCancel }) {
  if (!duplicates?.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--surface-overlay)" }}
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md card overflow-hidden" style={{ boxShadow: "var(--shadow-overlay)" }}>
        {/* Header */}
        <div className="card-header">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--warning-bg)" }}>
              <AlertTriangle className="w-5 h-5" style={{ color: "var(--warning-icon)" }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary">Duplicate Records Detected</h3>
              <p className="text-xs text-muted mt-0.5">
                {duplicates.length} file{duplicates.length !== 1 ? "s" : ""} match an existing record
              </p>
            </div>
          </div>
          <button onClick={onCancel} className="btn btn-ghost btn-sm">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="px-6 py-4 space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
          {duplicates.map((dup) => (
            <div key={dup.file.name} className="rounded-lg px-4 py-3 border" style={{ backgroundColor: "var(--warning-bg)", borderColor: "var(--warning-border)" }}>
              <p className="text-sm font-medium text-secondary truncate">{dup.file.name}</p>
              <p className="text-xs text-tertiary mt-1">
                Matches record <span className="font-mono font-semibold text-secondary">{dup.existingRecord.id}</span>
              </p>
              {dup.matchType === "vin" && (
                <p className="text-xs text-muted mt-0.5">Matched by VIN: <span className="font-mono">{dup.existingRecord.vin}</span></p>
              )}
              <p className="text-xs font-medium mt-2" style={{ color: "var(--warning-text)" }}>
                Uploading will overwrite the existing record.
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="card-footer flex items-center gap-3">
          <Button variant="secondary" size="md" icon={Ban} className="flex-1 justify-center" onClick={onCancel}>
            Cancel Upload
          </Button>
          <Button variant="primary" size="md" icon={Upload} className="flex-1 justify-center" onClick={onOverwrite}
            style={{ backgroundColor: "var(--warning-icon)", color: "#fff" }}
          >
            Overwrite
          </Button>
        </div>
      </div>
    </div>
  );
}