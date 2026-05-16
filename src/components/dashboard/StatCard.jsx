import { TrendingUp, AlertTriangle, TrendingDown } from "lucide-react";

const colorConfig = {
  blue: {
    icon: "bg-blue-100 text-blue-600",
    value: "text-blue-700",
    badge: "bg-blue-50 text-blue-600 border-blue-100",
  },
  amber: {
    icon: "bg-amber-100 text-amber-600",
    value: "text-amber-700",
    badge: "bg-amber-50 text-amber-600 border-amber-100",
  },
  slate: {
    icon: "bg-slate-100 text-slate-600",
    value: "text-slate-700",
    badge: "bg-slate-50 text-slate-500 border-slate-200",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-600",
    value: "text-emerald-700",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  violet: {
    icon: "bg-violet-100 text-violet-600",
    value: "text-violet-700",
    badge: "bg-violet-50 text-violet-600 border-violet-100",
  },
};

function TrendIcon({ trend }) {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5" />;
  if (trend === "warn") return <AlertTriangle className="w-3.5 h-3.5" />;
  return <TrendingDown className="w-3.5 h-3.5" />;
}

export default function StatCard({ label, value, delta, trend, color, icon: Icon }) {
  const cfg = colorConfig[color] ?? colorConfig.slate;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <p className="text-slate-500 text-sm font-medium leading-tight">{label}</p>
        {Icon && (
          <div className={`p-2 rounded-lg ${cfg.icon}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div>
        <p className={`text-3xl font-bold font-mono tracking-tight ${cfg.value}`}>
          {value.toLocaleString()}
        </p>
      </div>

      <div className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md border w-fit ${cfg.badge}`}>
        <TrendIcon trend={trend} />
        <span>{delta}</span>
      </div>
    </div>
  );
}