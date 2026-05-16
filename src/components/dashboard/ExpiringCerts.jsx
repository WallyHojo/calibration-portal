import { Link } from "react-router-dom";
import { AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { expiringCerts } from "../../data/mockDocuments";

function SeverityBar({ daysLeft }) {
  const max = 30;
  const pct = Math.max(0, Math.min(100, ((max - daysLeft) / max) * 100));
  const color =
    daysLeft <= 14
      ? "bg-red-500"
      : daysLeft <= 21
      ? "bg-amber-400"
      : "bg-amber-300";

  return (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function SeverityIcon({ severity }) {
  if (severity === "critical")
    return <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />;
  return <Clock className="w-4 h-4 text-amber-500 shrink-0" />;
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function ExpiringCerts() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-slate-800 font-semibold text-sm">Expiring Certificates</h3>
        <Link
          to="/documents"
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List */}
      <ul className="divide-y divide-slate-100">
        {expiringCerts.map((cert) => (
          <li
            key={cert.id}
            className="px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                <SeverityIcon severity={cert.severity} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-slate-700 text-sm font-medium truncate">
                    {cert.equipment}
                  </p>
                  <span
                    className={[
                      "text-xs font-bold font-mono shrink-0",
                      cert.daysLeft <= 14 ? "text-red-600" : "text-amber-600",
                    ].join(" ")}
                  >
                    {cert.daysLeft}d
                  </span>
                </div>
                <p className="text-slate-400 text-xs mb-2 truncate">
                  {cert.customer} &mdash;{" "}
                  <span className="font-mono">{cert.id}</span>
                </p>
                <SeverityBar daysLeft={cert.daysLeft} />
                <p className="text-slate-400 text-xs mt-1.5">
                  Expires {formatDate(cert.expires)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}