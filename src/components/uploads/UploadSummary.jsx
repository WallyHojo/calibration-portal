import { CheckCircle2, RefreshCcw, XCircle, AlertTriangle } from "lucide-react";
import Button from "../ui/Button";

export default function UploadSummary({ items, onUploadMore }) {
  const complete    = items.filter((i) => i.status === "complete");
  const overwritten = items.filter((i) => i.status === "overwritten");
  const failed      = items.filter((i) => i.status === "error");

  if (complete.length + overwritten.length + failed.length !== items.length) return null;

  return (
    <div className="card overflow-hidden">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-primary">Upload Complete</h3>
        <p className="text-xs text-muted">Batch of {items.length} file{items.length !== 1 ? "s" : ""} processed</p>
      </div>

      <div className="grid grid-cols-3 border-b" style={{ borderColor: "var(--border-faint)" }}>
        {[
          { icon: CheckCircle2, count: complete.length,    label: "New Records", color: "var(--success-text)" },
          { icon: AlertTriangle,count: overwritten.length, label: "Overwritten", color: "var(--warning-text)" },
          { icon: XCircle,      count: failed.length,      label: "Failed",      color: "var(--danger-text)"  },
        ].map(({ icon: Icon, count, label, color }, i) => (
          <div key={i} className="flex flex-col items-center gap-1 py-5 border-r last:border-r-0" style={{ borderColor: "var(--border-faint)" }}>
            <Icon className="w-5 h-5" style={{ color }} />
            <p className="text-2xl font-bold font-mono" style={{ color }}>{count}</p>
            <p className="text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>

      {failed.length > 0 && (
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border-faint)" }}>
          <p className="label-overline mb-2">Failed Files</p>
          <ul className="space-y-1.5">
            {failed.map((item) => (
              <li key={item.file.name} className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-danger shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-secondary">{item.file.name}</p>
                  {item.error && <p className="text-xs text-danger">{item.error}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card-footer">
        <Button variant="secondary" size="md" icon={RefreshCcw} className="w-full justify-center" onClick={onUploadMore}>
          Upload Another Batch
        </Button>
      </div>
    </div>
  );
}