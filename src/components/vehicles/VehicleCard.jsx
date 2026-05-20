import { Link } from "react-router-dom";
import { Car, FileText, Building2, ArrowRight } from "lucide-react";

export default function VehicleCard({ vehicle }) {
  const { records } = vehicle;
  const latestRecord  = records[0] ?? null;
  const completeCount = records.filter((r) => r.status === "complete").length;
  const pendingCount  = records.filter((r) => r.status === "pending").length;

  // Unique ADAS systems serviced on this vehicle
  const adasSystems = [...new Set(records.map((r) => r.adasSystem))];

  return (
    <Link
      to={`/vehicles/${vehicle.vin}`}
      className="block bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
            <Car className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-slate-800 font-semibold text-sm leading-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <p className="font-mono text-xs text-slate-400 mt-0.5 truncate">
              {vehicle.vin}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
        <div className="flex flex-col items-center py-3 gap-0.5">
          <p className="text-lg font-bold font-mono text-slate-700">{records.length}</p>
          <p className="text-xs text-slate-400">Records</p>
        </div>
        <div className="flex flex-col items-center py-3 gap-0.5">
          <p className="text-lg font-bold font-mono text-emerald-700">{completeCount}</p>
          <p className="text-xs text-slate-400">Complete</p>
        </div>
        <div className="flex flex-col items-center py-3 gap-0.5">
          <p className={`text-lg font-bold font-mono ${pendingCount > 0 ? "text-amber-600" : "text-slate-300"}`}>
            {pendingCount}
          </p>
          <p className="text-xs text-slate-400">Pending</p>
        </div>
      </div>

      {/* ADAS systems */}
      <div className="px-5 py-3 border-b border-slate-100">
        <div className="flex flex-wrap gap-1.5">
          {adasSystems.slice(0, 2).map((sys) => (
            <span
              key={sys}
              className="inline-flex px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 font-medium"
            >
              {sys}
            </span>
          ))}
          {adasSystems.length > 2 && (
            <span className="inline-flex px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-400">
              +{adasSystems.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 min-w-0">
          <Building2 className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="truncate">{vehicle.customer}</span>
        </div>
        {latestRecord && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0 ml-2">
            <FileText className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-mono">{latestRecord.id}</span>
          </div>
        )}
      </div>
    </Link>
  );
}