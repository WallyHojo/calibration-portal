import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../hooks/useTheme";

function formatCurrency(val) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm inline-block"
              style={{ background: entry.color }}
            />
            <span className="text-slate-500 dark:text-slate-400">{entry.name}</span>
          </div>
          <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ProfitChart({ data }) {
  const { isDark } = useTheme();

  // Recharts uses inline styles — read theme to swap colors
  const gridColor  = isDark ? "#1e293b" : "#f1f5f9";
  const tickColor  = isDark ? "#64748b" : "#94a3b8";
  const cursorFill = isDark ? "#1e293b" : "#f8fafc";
  const legendStyle = {
    fontSize: "12px",
    paddingTop: "16px",
    color: isDark ? "#94a3b8" : "#64748b",
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
      <div className="mb-5">
        <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm">
          Monthly Profit Trend
        </h3>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
          Revenue vs. cost vs. profit by month
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          barCategoryGap="28%"
          barGap={3}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: cursorFill }} />
          <Legend
            iconType="square"
            iconSize={10}
            wrapperStyle={legendStyle}
          />
          <Bar dataKey="revenue" name="Revenue (List)" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
          <Bar dataKey="cost"    name="Cost"           fill="#fca5a5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit"  name="Profit"         fill="#6ee7b7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}