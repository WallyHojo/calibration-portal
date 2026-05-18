import { DollarSign, TrendingUp, Briefcase, Award } from "lucide-react";

function formatCurrency(val) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

const cards = [
  {
    key: "totalProfit",
    label: "Total Profit",
    icon: DollarSign,
    color: "emerald",
    format: formatCurrency,
  },
  {
    key: "avgMargin",
    label: "Avg. Margin",
    icon: TrendingUp,
    color: "blue",
    format: (v) => `${v}%`,
  },
  {
    key: "jobCount",
    label: "Jobs Analysed",
    icon: Briefcase,
    color: "slate",
    format: (v) => v.toLocaleString(),
  },
  {
    key: "bestJob",
    label: "Best Job Profit",
    icon: Award,
    color: "violet",
    format: (v) => (v ? formatCurrency(v.profit) : "—"),
  },
];

const colorConfig = {
  emerald: {
    icon:  "bg-emerald-100 text-emerald-600",
    value: "text-emerald-700",
    sub:   "text-emerald-500",
  },
  blue: {
    icon:  "bg-blue-100 text-blue-600",
    value: "text-blue-700",
    sub:   "text-blue-400",
  },
  slate: {
    icon:  "bg-slate-100 text-slate-600",
    value: "text-slate-700",
    sub:   "text-slate-400",
  },
  violet: {
    icon:  "bg-violet-100 text-violet-600",
    value: "text-violet-700",
    sub:   "text-violet-400",
  },
};

export default function ProfitSummaryCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const cfg  = colorConfig[card.color];
        const Icon = card.icon;
        const raw  = stats[card.key];
        const display = card.format(raw);

        // Sub-label for best job card
        const sub =
          card.key === "bestJob" && stats.bestJob
            ? stats.bestJob.vehicle
            : null;

        return (
          <div
            key={card.key}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <p className="text-slate-500 text-sm font-medium">{card.label}</p>
              <div className={`p-2 rounded-lg ${cfg.icon}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className={`text-3xl font-bold font-mono tracking-tight ${cfg.value}`}>
                {display}
              </p>
              {sub && (
                <p className={`text-xs mt-1 truncate ${cfg.sub}`}>{sub}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}