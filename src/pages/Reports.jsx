import { useState, useMemo } from "react";
import { AlertCircle } from "lucide-react";
import ProfitSummaryCards from "../components/reports/ProfitSummaryCards";
import ProfitChart from "../components/reports/ProfitChart";
import ProfitTable from "../components/reports/ProfitTable";
import {
  profitRecordsWithCalcs,
  getSummaryStats,
  getMonthlyTrend,
} from "../data/mockReportData";

const DATE_RANGES = [
  { key: "30d",  label: "Last 30 Days" },
  { key: "90d",  label: "Last 90 Days" },
  { key: "all",  label: "All Time"     },
];

function filterByRange(records, range) {
  if (range === "all") return records;
  const now  = new Date("2024-11-15"); // reference date for mock data
  const days = range === "30d" ? 30 : 90;
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - days);
  return records.filter((r) => new Date(r.date) >= cutoff);
}

export default function Reports() {
  const [dateRange, setDateRange] = useState("30d");

  const filtered = useMemo(
    () => filterByRange(profitRecordsWithCalcs, dateRange),
    [dateRange]
  );

  const stats       = useMemo(() => getSummaryStats(filtered),    [filtered]);
  const monthlyData = useMemo(() => getMonthlyTrend(filtered),    [filtered]);

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-slate-800 text-lg font-semibold">Reports</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Profit analytics across all calibration jobs.
          </p>
        </div>

        {/* Date range toggle */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 gap-0.5 shadow-sm">
          {DATE_RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setDateRange(r.key)}
              className={[
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                dateRange === r.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mock data notice */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-amber-700 text-sm">
          <span className="font-semibold">Placeholder data — </span>
          Profit figures will be extracted automatically from uploaded PDFs
          once the Azure Document Intelligence pipeline is connected.
        </p>
      </div>

      {/* Summary cards */}
      <ProfitSummaryCards stats={stats} />

      {/* Chart */}
      <ProfitChart data={monthlyData} />

      {/* Per-job table */}
      <ProfitTable records={filtered} />

    </div>
  );
}