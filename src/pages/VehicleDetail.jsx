import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, Car, Building2,
  CheckCircle2, Clock, ExternalLink, Download,
} from "lucide-react";
import { getVehicleByVin } from "../data/mockVehicles";
import { EmptyState }      from "../components/ui/Primitives";
import Badge               from "../components/ui/Badge";

function formatDateLong(iso) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

export default function VehicleDetail() {
  const { vin }  = useParams();
  const navigate = useNavigate();
  const vehicle  = getVehicleByVin(vin);

  if (!vehicle) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <EmptyState
          icon={Car}
          title="Vehicle not found"
          description={`No vehicle record exists for VIN ${vin}.`}
        >
          <Link
            to="/vehicles"
            className="flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Vehicles
          </Link>
        </EmptyState>
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
          className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-disabled">/</span>
        <span className="text-sm text-muted">Vehicles</span>
        <span className="text-disabled">/</span>
        <span className="font-mono text-sm text-muted">{vehicle.vin}</span>
      </div>

      {/* Hero card */}
      <div className="card px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--surface-inset)" }}
            >
              <Car className="w-6 h-6 text-muted" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h2>
              <p className="font-mono text-sm text-muted mt-0.5">{vehicle.vin}</p>
              <div className="flex items-center gap-1.5 mt-2 text-sm text-tertiary">
                <Building2 className="w-3.5 h-3.5 text-disabled" />
                {vehicle.customer}
              </div>
            </div>
          </div>

          {/* Count pills */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {[
              { val: records.length,  label: "Records",  bg: "var(--surface-inset)",  fg: "var(--text-secondary)"  },
              { val: completeCount,   label: "Complete", bg: "var(--success-bg)",      fg: "var(--success-text)"    },
              ...(pendingCount > 0 ? [{ val: pendingCount, label: "Pending", bg: "var(--warning-bg)", fg: "var(--warning-text)" }] : []),
            ].map(({ val, label, bg, fg }) => (
              <div
                key={label}
                className="flex flex-col items-center px-4 py-2 rounded-lg border"
                style={{ backgroundColor: bg, borderColor: "transparent" }}
              >
                <p className="text-xl font-bold font-mono" style={{ color: fg }}>{val}</p>
                <p className="text-xs text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ADAS systems */}
        <div className="border-t mt-5 pt-4" style={{ borderColor: "var(--border-faint)" }}>
          <p className="label-overline mb-2">ADAS Systems Serviced</p>
          <div className="flex flex-wrap gap-2">
            {adasSystems.map((sys) => (
              <span key={sys} className="badge badge-neutral px-2.5 py-1 text-xs">{sys}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Calibration history */}
      <div className="card overflow-hidden">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-primary">Calibration History</h3>
          <p className="text-xs text-muted">
            Most recent first — {records.length} record{records.length !== 1 ? "s" : ""}
          </p>
        </div>

        <ul className="divide-y" style={{ borderColor: "var(--border-faint)" }}>
          {records.map((record, idx) => (
            <li key={record.id} className="px-5 py-4 hover:bg-hover transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  {/* Timeline dot */}
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ring-2"
                    style={{
                      backgroundColor: idx === 0 ? "var(--accent)" : "var(--border-strong)",
                      "--tw-ring-color": "var(--surface-card)",
                    }}
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-secondary">{record.adasSystem}</p>
                      <Badge variant={record.calibrationType === "Dynamic" ? "dynamic" : "static"}>
                        {record.calibrationType}
                      </Badge>
                      <Badge variant={record.status}>
                        {record.status === "complete"
                          ? <><CheckCircle2 className="w-3 h-3" /> Complete</>
                          : <><Clock className="w-3 h-3" /> Pending</>
                        }
                      </Badge>
                    </div>
                    <p className="text-xs text-muted">
                      {formatDateLong(record.calibrationDate)} &mdash; Tech: {record.technician}
                    </p>
                    {record.notes && (
                      <p className="text-xs text-muted mt-1 italic">{record.notes}</p>
                    )}
                    <p className="font-mono text-xs text-muted mt-1">{record.id}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/documents/${record.id}`}
                    className="flex items-center gap-1 text-xs font-medium text-accent px-2.5 py-1.5 rounded-lg hover:bg-accent-subtle transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View
                  </Link>
                  <button className="flex items-center gap-1 text-xs font-medium text-tertiary px-2.5 py-1.5 rounded-lg hover:bg-hover transition-colors">
                    <Download className="w-3.5 h-3.5" /> PDF
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