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
      className="block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
            <Car className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm leading-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <p className="font-mono text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">
              {vehicle.vin}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col items-center py-3 gap-0.5">
          <p className="text-lg font-bold font-mono text-slate-700 dark:text-slate-200">{records.length}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Records</p>
        </div>
        <div className="flex flex-col items-center py-3 gap-0.5">
          <p className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-300">{completeCount}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Complete</p>
        </div>
        <div className="flex flex-col items-center py-3 gap-0.5">
          <p className={`text-lg font-bold font-mono ${pendingCount > 0 ? "text-amber-600" : "text-slate-300 dark:text-slate-600"}`}>
            {pendingCount}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Pending</p>
        </div>
      </div>

      {/* ADAS systems */}
      <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap gap-1.5">
          {adasSystems.slice(0, 2).map((sys) => (
            <span
              key={sys}
              className="inline-flex px-2 py-0.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-500 font-medium"
            >
              {sys}
            </span>
          ))}
          {adasSystems.length > 2 && (
            <span className="inline-flex px-2 py-0.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-400 dark:text-slate-500">
              +{adasSystems.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500 min-w-0">
          <Building2 className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
          <span className="truncate">{vehicle.customer}</span>
        </div>
        {latestRecord && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 shrink-0 ml-2">
            <FileText className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
            <span className="font-mono">{latestRecord.id}</span>
          </div>
        )}
      </div>
    </Link>
  );
}