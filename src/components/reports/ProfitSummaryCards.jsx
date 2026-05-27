import { DollarSign, TrendingUp, Briefcase, Award } from "lucide-react";

function formatCurrency(val) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(val);
}

const cards = [
  { key: "totalProfit", label: "Total Profit",    icon: DollarSign, color: "success", format: formatCurrency },
  { key: "avgMargin",   label: "Avg. Margin",      icon: TrendingUp, color: "info",    format: (v) => `${v}%` },
  { key: "jobCount",    label: "Jobs Analysed",    icon: Briefcase,  color: "neutral", format: (v) => v.toLocaleString() },
  { key: "bestJob",     label: "Best Job Profit",  icon: Award,      color: "violet",  format: (v) => v ? formatCurrency(v.profit) : "—" },
];

const colorMap = {
  success: { icon: "var(--success-bg)",    iconFg: "var(--success-text)", value: "var(--success-text)" },
  info:    { icon: "var(--info-bg)",       iconFg: "var(--info-text)",    value: "var(--info-text)"    },
  neutral: { icon: "var(--surface-inset)", iconFg: "var(--text-tertiary)",value: "var(--text-secondary)"},
  violet:  { icon: "var(--violet-bg)",     iconFg: "var(--violet-text)",  value: "var(--violet-text)"  },
};

export default function ProfitSummaryCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const cfg     = colorMap[card.color];
        const Icon    = card.icon;
        const raw     = stats[card.key];
        const display = card.format(raw);
        const sub     = card.key === "bestJob" && stats.bestJob ? stats.bestJob.vehicle : null;

        return (
          <div key={card.key} className="card p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-muted">{card.label}</p>
              <div className="p-2 rounded-lg" style={{ backgroundColor: cfg.icon }}>
                <Icon className="w-4 h-4" style={{ color: cfg.iconFg }} />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold font-mono tracking-tight" style={{ color: cfg.value }}>
                {display}
              </p>
              {sub && <p className="text-xs text-muted mt-1 truncate">{sub}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}