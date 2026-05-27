import { useState, useMemo } from "react";
import { AlertCircle } from "lucide-react";
import ProfitSummaryCards from "../components/reports/ProfitSummaryCards";
import ProfitChart from "../components/reports/ProfitChart";
import ProfitTable from "../components/reports/ProfitTable";
import { profitRecordsWithCalcs, getSummaryStats, getMonthlyTrend } from "../data/mockReportData";
import { cn } from "../lib/cn";

const DATE_RANGES = [
  { key: "30d", label: "Last 30 Days" },
  { key: "90d", label: "Last 90 Days" },
  { key: "all", label: "All Time"     },
];

function filterByRange(records, range) {
  if (range === "all") return records;
  const now    = new Date("2024-11-15");
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - (range === "30d" ? 30 : 90));
  return records.filter((r) => new Date(r.date) >= cutoff);
}

export default function Reports() {
  const [dateRange, setDateRange] = useState("30d");

  const filtered    = useMemo(() => filterByRange(profitRecordsWithCalcs, dateRange), [dateRange]);
  const stats       = useMemo(() => getSummaryStats(filtered), [filtered]);
  const monthlyData = useMemo(() => getMonthlyTrend(filtered),  [filtered]);

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Reports</h2>
          <p className="page-description">Profit analytics across all calibration jobs.</p>
        </div>
        <div className="card flex items-center p-1 gap-0.5">
          {DATE_RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setDateRange(r.key)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                dateRange === r.key
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted hover:text-secondary hover:bg-hover"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="card bg-warning border-warning flex items-start gap-3 px-4 py-3">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--warning-icon)" }} />
        <p className="text-sm text-warning">
          <span className="font-semibold">Placeholder data — </span>
          Profit figures will be extracted automatically from uploaded PDFs once the Azure Document Intelligence pipeline is connected.
        </p>
      </div>

      <ProfitSummaryCards stats={stats} />
      <ProfitChart data={monthlyData} />
      <ProfitTable records={filtered} />
    </div>
  );
}