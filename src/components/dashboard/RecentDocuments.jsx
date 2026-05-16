import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { recentDocuments } from "../../data/mockDocuments";

const statusConfig = {
  complete: {
    label: "Complete",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] ?? statusConfig.complete;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${cfg.className}`}>
      {cfg.label}
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

export default function RecentDocuments() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-slate-800 font-semibold text-sm">Recent Calibrations</h3>
        <Link
          to="/documents"
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                Record ID
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                Vehicle
              </th>
              <th className="hidden md:table-cell text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                ADAS System
              </th>
              <th className="hidden lg:table-cell text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                Customer
              </th>
              <th className="hidden lg:table-cell text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                Date
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentDocuments.map((doc) => (
              <tr
                key={doc.id}
                className="hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <td className="px-5 py-3.5 font-mono text-xs text-slate-500 whitespace-nowrap">
                  {doc.id}
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-slate-700 font-medium leading-tight whitespace-nowrap">
                    {doc.year} {doc.make} {doc.model}
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5 font-mono">
                    {doc.vin}
                  </p>
                </td>
                <td className="hidden md:table-cell px-5 py-3.5 text-slate-600 whitespace-nowrap">
                  {doc.adasSystem}
                </td>
                <td className="hidden lg:table-cell px-5 py-3.5 text-slate-600 whitespace-nowrap">
                  {doc.customer}
                </td>
                <td className="hidden lg:table-cell px-5 py-3.5 font-mono text-xs text-slate-500 whitespace-nowrap">
                  {formatDate(doc.calibrationDate)}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={doc.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}