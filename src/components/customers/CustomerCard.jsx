import { MapPin, Phone, Mail, FileText, Building2, Car } from "lucide-react";

const typeConfig = {
  collision:   { label: "Collision Shop", className: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"     },
  dealership:  { label: "Dealership",     className: "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800" },
};

const statusConfig = {
  active:   { label: "Active",   className: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
  inactive: { label: "Inactive", className: "bg-slate-100 dark:bg-slate-800  text-slate-500 dark:text-slate-500  border-slate-200 dark:border-slate-700"    },
};

export default function CustomerCard({ customer }) {
  const typeCfg   = typeConfig[customer.type]     ?? typeConfig.collision;
  const statusCfg = statusConfig[customer.status] ?? statusConfig.active;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:border-blue-200 hover:shadow-md transition-all">

      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${typeCfg.className}`}>
              {typeCfg.label}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusCfg.className}`}>
              {statusCfg.label}
            </span>
          </div>
        </div>

        <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm leading-tight">
          {customer.name}
        </h3>
        {customer.franchiseBrand && (
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">{customer.franchiseBrand} Franchise</p>
        )}
        {customer.drp?.length > 0 && (
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
            DRP: {customer.drp.join(", ")}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col items-center gap-0.5 py-3">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <p className="text-lg font-bold font-mono text-slate-700 dark:text-slate-200">
              {customer.totalCalibrations}
            </p>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">Total Records</p>
        </div>
        <div className="flex flex-col items-center gap-0.5 py-3">
          <div className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-emerald-400" />
            <p className="text-lg font-bold font-mono text-slate-700 dark:text-slate-200">
              {customer.calibrationsThisMonth}
            </p>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">This Month</p>
        </div>
      </div>

      {/* Contact */}
      <div className="px-5 py-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
          <span>{customer.address.city}, {customer.address.state}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
          <Mail className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
          <span className="truncate">{customer.contact.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
          <Phone className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
          <span>{customer.contact.phone}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Contact:{" "}
          <span className="font-medium text-slate-500 dark:text-slate-500">{customer.contact.name}</span>
          {" — "}{customer.contact.title}
        </p>
      </div>

    </div>
  );
}