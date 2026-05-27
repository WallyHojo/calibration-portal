import { FileText, CheckCircle2, XCircle, AlertTriangle, Loader2, Clock } from "lucide-react";

const statusConfig = {
  pending:     { icon: Clock,        label: "Queued",                    barColor: "var(--border-strong)",  barWidth: "0%"   },
  checking:    { icon: Loader2,      label: "Checking for duplicates…",  barColor: "var(--accent)",         barWidth: "20%", spin: true },
  uploading:   { icon: Loader2,      label: "Uploading…",                barColor: "var(--accent)",         barWidth: "70%", spin: true },
  complete:    { icon: CheckCircle2, label: "Complete",                  barColor: "var(--success-icon)",   barWidth: "100%" },
  overwritten: { icon: CheckCircle2, label: "Overwritten",               barColor: "var(--warning-icon)",   barWidth: "100%" },
  error:       { icon: XCircle,      label: "Failed",                    barColor: "var(--danger-icon)",    barWidth: "100%" },
  duplicate:   { icon: AlertTriangle,label: "Duplicate detected",        barColor: "var(--warning-icon)",   barWidth: "30%"  },
};

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadQueue({ items }) {
  if (!items?.length) return null;

  const done = items.filter((i) => i.status === "complete" || i.status === "overwritten").length;

  return (
    <div className="card overflow-hidden">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-primary">Upload Progress</h3>
        <p className="text-xs text-muted">{done} of {items.length} complete</p>
      </div>
      <ul className="divide-y" style={{ borderColor: "var(--border-faint)" }}>
        {items.map((item) => {
          const cfg  = statusConfig[item.status] ?? statusConfig.pending;
          const Icon = cfg.icon;
          return (
            <li key={item.file.name} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-secondary truncate">{item.file.name}</p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Icon className={`w-3.5 h-3.5 text-muted ${cfg.spin ? "animate-spin" : ""}`} />
                      <span className="text-xs text-muted whitespace-nowrap">{cfg.label}</span>
                    </div>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: cfg.barWidth, backgroundColor: cfg.barColor }} />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-muted">{formatBytes(item.file.size)}</p>
                    {item.recordId && <p className="font-mono text-xs text-muted">→ {item.recordId}</p>}
                    {item.error    && <p className="text-xs text-danger">{item.error}</p>}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}