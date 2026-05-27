import { Upload, AlertTriangle, UserPlus, Car } from "lucide-react";
import { activityFeed } from "../../data/dashboardData";

const typeConfig = {
  upload:   { icon: Upload,        bg: "var(--info-bg)",     fg: "var(--info-text)"    },
  alert:    { icon: AlertTriangle, bg: "var(--warning-bg)",  fg: "var(--warning-text)" },
  customer: { icon: UserPlus,      bg: "var(--success-bg)",  fg: "var(--success-text)" },
  vehicle:  { icon: Car,           bg: "var(--surface-inset)",fg:"var(--text-tertiary)" },
};

function formatRelative(iso) {
  const now  = new Date("2024-11-15T15:00:00Z");
  const diff = Math.floor((now - new Date(iso)) / 60000);
  if (diff < 60)   return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

export default function ActivityFeed() {
  return (
    <div className="card overflow-hidden">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-primary">Recent Activity</h3>
      </div>

      <ul className="px-5 py-4 space-y-0">
        {activityFeed.map((item, idx) => {
          const cfg  = typeConfig[item.type] ?? typeConfig.upload;
          const Icon = cfg.icon;
          const isLast = idx === activityFeed.length - 1;

          return (
            <li key={item.id} className="flex gap-4">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div
                  className="timeline-dot"
                  style={{ backgroundColor: cfg.bg }}
                >
                  <Icon className="w-3 h-3" style={{ color: cfg.fg }} />
                </div>
                {!isLast && <div className="timeline-line" />}
              </div>

              {/* Content */}
              <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-4"}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-secondary leading-snug">
                    {item.message}
                  </p>
                  <span className="text-xs text-muted whitespace-nowrap shrink-0 font-mono">
                    {formatRelative(item.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-muted mt-0.5 truncate">{item.detail}</p>
                <p className="text-xs text-muted mt-0.5">
                  <span className="font-medium text-tertiary">{item.user}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}