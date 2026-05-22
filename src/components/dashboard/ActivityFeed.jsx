import { Upload, AlertTriangle, UserPlus, Car } from "lucide-react";
import { activityFeed } from "../../data/dashboardData";

const typeConfig = {
  upload:   { icon: Upload,        dotClass: "bg-blue-500",    iconClass: "text-blue-500"    },
  alert:    { icon: AlertTriangle, dotClass: "bg-amber-500",   iconClass: "text-amber-500"   },
  customer: { icon: UserPlus,      dotClass: "bg-emerald-500", iconClass: "text-emerald-500" },
  vehicle:  { icon: Car,           dotClass: "bg-slate-500",   iconClass: "text-slate-500 dark:text-slate-500"   },
};

function formatRelative(iso) {
  const now = new Date("2024-11-15T15:00:00Z"); // reference time for mock data
  const then = new Date(iso);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function ActivityFeed() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm">Recent Activity</h3>
      </div>

      {/* Feed */}
      <ul className="px-5 py-4 space-y-0">
        {activityFeed.map((item, idx) => {
          const cfg = typeConfig[item.type] ?? typeConfig.upload;
          const Icon = cfg.icon;
          const isLast = idx === activityFeed.length - 1;

          return (
            <li key={item.id} className="flex gap-4">
              {/* Timeline icon + connector line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full mt-0.5 shrink-0 ring-2 ring-white flex items-center justify-center ${cfg.dotClass}`}
                >
                  <Icon className="w-3 h-3 text-white" />
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-slate-100 dark:bg-slate-800 my-1" />
                )}
              </div>

              {/* Content */}
              <div className={`pb-4 flex-1 min-w-0 ${isLast ? "pb-0" : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-slate-700 dark:text-slate-200 text-sm font-medium leading-snug">
                    {item.message}
                  </p>
                  <span className="text-slate-400 dark:text-slate-500 text-xs whitespace-nowrap shrink-0 font-mono">
                    {formatRelative(item.timestamp)}
                  </span>
                </div>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5 truncate">
                  {item.detail}
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                  <span className="font-medium text-slate-500 dark:text-slate-500">{item.user}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}