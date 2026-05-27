import { Link } from "react-router-dom";
import { Car, FileText, Building2, ArrowRight } from "lucide-react";

export default function VehicleCard({ vehicle }) {
  const { records }   = vehicle;
  const latestRecord  = records[0] ?? null;
  const completeCount = records.filter((r) => r.status === "complete").length;
  const pendingCount  = records.filter((r) => r.status === "pending").length;
  const adasSystems   = [...new Set(records.map((r) => r.adasSystem))];

  return (
    <Link
      to={`/vehicles/${vehicle.vin}`}
      className="card overflow-hidden hover:border-accent transition-colors block group"
    >
      <div className="card-header">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
            style={{ backgroundColor: "var(--surface-inset)" }}
          >
            <Car className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-primary leading-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <p className="font-mono text-xs text-muted mt-0.5 truncate">{vehicle.vin}</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-disabled group-hover:text-accent transition-colors shrink-0 mt-0.5" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border-b" style={{ borderColor: "var(--border-faint)" }}>
        {[
          { val: records.length,  label: "Records",  color: "var(--text-secondary)"  },
          { val: completeCount,   label: "Complete", color: "var(--success-text)"     },
          { val: pendingCount,    label: "Pending",  color: pendingCount > 0 ? "var(--warning-text)" : "var(--text-disabled)" },
        ].map(({ val, label, color }, i) => (
          <div key={i} className="flex flex-col items-center py-3 gap-0.5 border-r last:border-r-0" style={{ borderColor: "var(--border-faint)" }}>
            <p className="text-lg font-bold font-mono" style={{ color }}>{val}</p>
            <p className="text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* ADAS tags */}
      <div className="px-5 py-3 border-b flex flex-wrap gap-1.5" style={{ borderColor: "var(--border-faint)" }}>
        {adasSystems.slice(0, 2).map((sys) => (
          <span key={sys} className="badge badge-neutral text-xs">{sys}</span>
        ))}
        {adasSystems.length > 2 && (
          <span className="badge badge-neutral text-xs">+{adasSystems.length - 2} more</span>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-tertiary min-w-0">
          <Building2 className="w-3.5 h-3.5 text-disabled shrink-0" />
          <span className="truncate">{vehicle.customer}</span>
        </div>
        {latestRecord && (
          <div className="flex items-center gap-1.5 text-xs text-muted shrink-0 ml-2">
            <FileText className="w-3.5 h-3.5 text-disabled" />
            <span className="font-mono">{latestRecord.id}</span>
          </div>
        )}
      </div>
    </Link>
  );
}