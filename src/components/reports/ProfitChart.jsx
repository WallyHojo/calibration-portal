import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../hooks/useTheme";

function formatCurrency(val) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(val);
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="card px-4 py-3 text-sm"
      style={{ boxShadow: "var(--shadow-lg)" }}
    >
      <p className="font-semibold text-primary mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: entry.color }} />
            <span className="text-muted">{entry.name}</span>
          </div>
          <span className="font-mono font-semibold text-secondary">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProfitChart({ data }) {
  const { isDark } = useTheme();

  // Recharts requires inline styles — read CSS vars from the document
  const style    = getComputedStyle(document.documentElement);
  const gridColor  = style.getPropertyValue("--chart-grid").trim()   || (isDark ? "#1e293b" : "#f1f5f9");
  const tickColor  = style.getPropertyValue("--chart-tick").trim()   || (isDark ? "#64748b" : "#94a3b8");
  const cursorFill = style.getPropertyValue("--chart-cursor").trim() || (isDark ? "#1e293b" : "#f8fafc");

  return (
    <div className="card p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-primary">Monthly Profit Trend</h3>
        <p className="text-xs text-muted mt-0.5">Revenue vs. cost vs. profit by month</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barCategoryGap="28%" barGap={3}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: cursorFill }} />
          <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: "12px", paddingTop: "16px", color: tickColor }} />
          <Bar dataKey="revenue" name="Revenue (List)" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
          <Bar dataKey="cost"    name="Cost"           fill="#fca5a5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit"  name="Profit"         fill="#6ee7b7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}