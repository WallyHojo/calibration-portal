import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Car,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Download,
} from "lucide-react";
import { getVehicleByVin } from "../data/mockVehicles";

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatDateLong(iso) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg =
    status === "complete"
      ? { icon: CheckCircle2, label: "Complete", className: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" }
      : { icon: Clock,        label: "Pending",  className: "bg-amber-50 dark:bg-amber-950/30  text-amber-700 dark:text-amber-300  border-amber-200 dark:border-amber-800"  };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border ${cfg.className}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function TypeBadge({ type }) {
  return (
    <span className={[
      "inline-flex px-2 py-0.5 rounded text-xs font-medium border",
      type === "Dynamic"
        ? "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800"
        : "bg-slate-50 dark:bg-slate-800/50  text-slate-600 dark:text-slate-500  border-slate-200 dark:border-slate-700",
    ].join(" ")}>
      {type}
    </span>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function VehicleDetail() {
  const { vin }    = useParams();
  const navigate   = useNavigate();
  const vehicle    = getVehicleByVin(vin);

  // 404 state
  if (!vehicle) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <Car className="w-7 h-7 text-slate-400 dark:text-slate-500" />
          </div>
          <h2 className="text-slate-700 dark:text-slate-200 font-semibold text-lg mb-2">Vehicle not found</h2>
          <p className="text-slate-400 dark:text-slate-500 text-sm mb-6 max-w-xs">
            No vehicle record exists for VIN{" "}
            <span className="font-mono">{vin}</span>.
          </p>
          <Link
            to="/vehicles"
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const { records }   = vehicle;
  const completeCount = records.filter((r) => r.status === "complete").length;
  const pendingCount  = records.filter((r) => r.status === "pending").length;
  const adasSystems   = [...new Set(records.map((r) => r.adasSystem))];

  return (
    <div className="space-y-5 max-w-4xl mx-auto">

      {/* Back nav */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="text-slate-500 dark:text-slate-500 text-sm">Vehicles</span>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="font-mono text-sm text-slate-500 dark:text-slate-500">{vehicle.vin}</span>
      </div>

      {/* Hero card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <Car className="w-6 h-6 text-slate-400 dark:text-slate-500" />
            </div>
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 text-xl font-bold">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h2>
              <p className="font-mono text-sm text-slate-400 dark:text-slate-500 mt-0.5">{vehicle.vin}</p>
              <div className="flex items-center gap-1.5 mt-2 text-sm text-slate-500 dark:text-slate-500">
                <Building2 className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                {vehicle.customer}
              </div>
            </div>
          </div>

          {/* Summary pills */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <div className="flex flex-col items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
              <p className="text-xl font-bold font-mono text-slate-700 dark:text-slate-200">{records.length}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Records</p>
            </div>
            <div className="flex flex-col items-center px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
              <p className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-300">{completeCount}</p>
              <p className="text-xs text-emerald-500">Complete</p>
            </div>
            {pendingCount > 0 && (
              <div className="flex flex-col items-center px-4 py-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-xl font-bold font-mono text-amber-700 dark:text-amber-300">{pendingCount}</p>
                <p className="text-xs text-amber-500">Pending</p>
              </div>
            )}
          </div>
        </div>

        {/* ADAS systems serviced */}
        <div className="border-t border-slate-100 dark:border-slate-800 mt-5 pt-4">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
            ADAS Systems Serviced
          </p>
          <div className="flex flex-wrap gap-2">
            {adasSystems.map((sys) => (
              <span
                key={sys}
                className="inline-flex px-2.5 py-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-500 font-medium"
              >
                {sys}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Calibration history */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm">Calibration History</h3>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
            Most recent first — {records.length} record{records.length !== 1 ? "s" : ""}
          </p>
        </div>

        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {records.map((record, idx) => (
            <li key={record.id} className="px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors">
              <div className="flex items-start justify-between gap-4">

                {/* Left — record info */}
                <div className="flex items-start gap-3 min-w-0">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={[
                      "w-2.5 h-2.5 rounded-full mt-1.5 ring-2 ring-white",
                      idx === 0 ? "bg-blue-500" : "bg-slate-300",
                    ].join(" ")} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-slate-700 dark:text-slate-200 font-semibold text-sm">
                        {record.adasSystem}
                      </p>
                      <TypeBadge   type={record.calibrationType} />
                      <StatusBadge status={record.status} />
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs">
                      {formatDateLong(record.calibrationDate)} &mdash; Tech: {record.technician}
                    </p>
                    {record.notes && (
                      <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 italic">{record.notes}</p>
                    )}
                    <p className="font-mono text-xs text-slate-400 dark:text-slate-500 mt-1">{record.id}</p>
                  </div>
                </div>

                {/* Right — actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/documents/${record.id}`}
                    className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 dark:bg-blue-950/30 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View
                  </Link>
                  <button className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    PDF
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}