import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Clock,
} from "lucide-react";

// ─── Status config ─────────────────────────────────────────────────────────────
const statusConfig = {
  pending: {
    icon:      Clock,
    iconClass: "text-slate-400",
    label:     "Queued",
    barClass:  "bg-slate-200",
    barWidth:  "0%",
  },
  checking: {
    icon:      Loader2,
    iconClass: "text-blue-500 animate-spin",
    label:     "Checking for duplicates…",
    barClass:  "bg-blue-400",
    barWidth:  "20%",
  },
  uploading: {
    icon:      Loader2,
    iconClass: "text-blue-500 animate-spin",
    label:     "Uploading…",
    barClass:  "bg-blue-500",
    barWidth:  "70%",
  },
  complete: {
    icon:      CheckCircle2,
    iconClass: "text-emerald-500",
    label:     "Complete",
    barClass:  "bg-emerald-400",
    barWidth:  "100%",
  },
  overwritten: {
    icon:      CheckCircle2,
    iconClass: "text-amber-500",
    label:     "Overwritten",
    barClass:  "bg-amber-400",
    barWidth:  "100%",
  },
  error: {
    icon:      XCircle,
    iconClass: "text-red-500",
    label:     "Failed",
    barClass:  "bg-red-400",
    barWidth:  "100%",
  },
  duplicate: {
    icon:      AlertTriangle,
    iconClass: "text-amber-500",
    label:     "Duplicate detected",
    barClass:  "bg-amber-300",
    barWidth:  "30%",
  },
};

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadQueue({ items }) {
  if (!items?.length) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-slate-800 font-semibold text-sm">Upload Progress</h3>
        <p className="text-slate-400 text-xs mt-0.5">
          {items.filter((i) => i.status === "complete" || i.status === "overwritten").length} of {items.length} complete
        </p>
      </div>

      <ul className="divide-y divide-slate-100">
        {items.map((item) => {
          const cfg  = statusConfig[item.status] ?? statusConfig.pending;
          const Icon = cfg.icon;

          return (
            <li key={item.file.name} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-slate-700 text-sm font-medium truncate">
                      {item.file.name}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Icon className={`w-3.5 h-3.5 ${cfg.iconClass}`} />
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {cfg.label}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${cfg.barClass}`}
                      style={{ width: cfg.barWidth }}
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-slate-400 text-xs">{formatBytes(item.file.size)}</p>
                    {item.recordId && (
                      <p className="text-slate-400 text-xs font-mono">
                        → {item.recordId}
                      </p>
                    )}
                    {item.error && (
                      <p className="text-red-500 text-xs">{item.error}</p>
                    )}
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