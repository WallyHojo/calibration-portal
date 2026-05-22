import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { pendingDocuments } from "../../data/mockDocuments";

const calibrationTypeConfig = {
  Dynamic: { className: "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800" },
  Static:  { className: "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-500 border-slate-200 dark:border-slate-700"   },
};

function TypeBadge({ type }) {
  const cfg = calibrationTypeConfig[type] ?? calibrationTypeConfig.Static;
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${cfg.className}`}>
      {type}
    </span>
  );
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function PendingDocuments() {
  if (pendingDocuments.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 text-center">
        <p className="text-slate-400 dark:text-slate-500 text-sm">No pending calibrations.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm">Pending Records</h3>
          <span className="bg-amber-100 text-amber-700 dark:text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full">
            {pendingDocuments.length}
          </span>
        </div>
        <Link
          to="/documents"
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List */}
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {pendingDocuments.map((doc) => (
          <li
            key={doc.id}
            className="px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="pt-0.5 shrink-0">
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-slate-700 dark:text-slate-200 text-sm font-medium truncate">
                    {doc.year} {doc.make} {doc.model}
                  </p>
                  <TypeBadge type={doc.calibrationType} />
                </div>
                <p className="text-slate-500 dark:text-slate-500 text-xs mb-1 truncate">
                  {doc.adasSystem}
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-xs truncate">
                  {doc.customer} &mdash; <span className="font-mono">{doc.id}</span>
                </p>
                {doc.notes && (
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 italic truncate">
                    {doc.notes}
                  </p>
                )}
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
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