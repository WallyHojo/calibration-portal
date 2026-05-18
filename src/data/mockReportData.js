// ─── Mock Report Data ──────────────────────────────────────────────────────────
// Profit analytics data for the Reports page.
// Each record extends a calibration job with list price (insurance invoice)
// and cost price (shop invoice), from which profit and margin are derived.
//
// In production these values will be extracted from PDFs via
// Azure Document Intelligence and stored against each record.

export const profitRecords = [
  {
    id: "ADAS-2024-03847",
    date: "2024-11-15",
    vehicle: "2023 Honda CR-V",
    adasSystem: "Front Forward Camera",
    customer: "Prestige Collision Center",
    customerId: "CUST-001",
    technician: "M. Thornton",
    listPrice: 485.00,
    costPrice: 210.00,
  },
  {
    id: "ADAS-2024-03846",
    date: "2024-11-15",
    vehicle: "2022 Ford F-150",
    adasSystem: "Front Radar (ACC)",
    customer: "Metro Ford",
    customerId: "CUST-002",
    technician: "D. Salinas",
    listPrice: 520.00,
    costPrice: 235.00,
  },
  {
    id: "ADAS-2024-03845",
    date: "2024-11-14",
    vehicle: "2024 Toyota Camry",
    adasSystem: "Pre-Collision System (PCS)",
    customer: "Sunrise Toyota",
    customerId: "CUST-003",
    technician: "M. Thornton",
    listPrice: 495.00,
    costPrice: 220.00,
  },
  {
    id: "ADAS-2024-03844",
    date: "2024-11-13",
    vehicle: "2023 Subaru Outback",
    adasSystem: "EyeSight Forward Camera",
    customer: "Lakewood Auto Body",
    customerId: "CUST-004",
    technician: "R. Okafor",
    listPrice: 610.00,
    costPrice: 265.00,
  },
  {
    id: "ADAS-2024-03843",
    date: "2024-11-13",
    vehicle: "2022 BMW 3 Series",
    adasSystem: "Lane Departure Camera",
    customer: "Prestige Collision Center",
    customerId: "CUST-001",
    technician: "D. Salinas",
    listPrice: 720.00,
    costPrice: 310.00,
  },
  {
    id: "ADAS-2024-03842",
    date: "2024-11-12",
    vehicle: "2024 Kia Sorento",
    adasSystem: "Surround View / 360° Camera",
    customer: "Lakewood Auto Body",
    customerId: "CUST-004",
    technician: "R. Okafor",
    listPrice: 780.00,
    costPrice: 340.00,
  },
  {
    id: "ADAS-2024-03841",
    date: "2024-11-11",
    vehicle: "2023 Toyota RAV4",
    adasSystem: "Pre-Collision System (PCS)",
    customer: "Sunrise Toyota",
    customerId: "CUST-003",
    technician: "M. Thornton",
    listPrice: 495.00,
    costPrice: 220.00,
  },
  {
    id: "ADAS-2024-03840",
    date: "2024-11-10",
    vehicle: "2023 Honda Pilot",
    adasSystem: "Honda Sensing Camera",
    customer: "AutoNation Honda Westside",
    customerId: "CUST-005",
    technician: "D. Salinas",
    listPrice: 540.00,
    costPrice: 230.00,
  },
  {
    id: "ADAS-2024-03839",
    date: "2024-11-09",
    vehicle: "2022 Chevrolet Silverado 1500",
    adasSystem: "Front Forward Camera",
    customer: "Summit Collision & Glass",
    customerId: "CUST-006",
    technician: "R. Okafor",
    listPrice: 465.00,
    costPrice: 200.00,
  },
  {
    id: "ADAS-2024-03838",
    date: "2024-11-08",
    vehicle: "2024 Subaru Forester",
    adasSystem: "EyeSight Forward Camera",
    customer: "Capital Subaru",
    customerId: "CUST-007",
    technician: "M. Thornton",
    listPrice: 610.00,
    costPrice: 265.00,
  },
  {
    id: "ADAS-2024-03837",
    date: "2024-11-07",
    vehicle: "2023 Ford Explorer",
    adasSystem: "Blind Spot Information (BLIS)",
    customer: "Metro Ford",
    customerId: "CUST-002",
    technician: "D. Salinas",
    listPrice: 490.00,
    costPrice: 215.00,
  },
  {
    id: "ADAS-2024-03836",
    date: "2024-11-06",
    vehicle: "2022 Nissan Rogue",
    adasSystem: "ProPilot Assist Camera",
    customer: "Summit Collision & Glass",
    customerId: "CUST-006",
    technician: "R. Okafor",
    listPrice: 510.00,
    costPrice: 225.00,
  },
  // ── October records for trend chart ─────────────────────────────────────────
  {
    id: "ADAS-2024-03821",
    date: "2024-10-28",
    vehicle: "2023 Toyota Highlander",
    adasSystem: "Pre-Collision System (PCS)",
    customer: "Sunrise Toyota",
    customerId: "CUST-003",
    technician: "M. Thornton",
    listPrice: 495.00,
    costPrice: 220.00,
  },
  {
    id: "ADAS-2024-03814",
    date: "2024-10-21",
    vehicle: "2022 Honda Accord",
    adasSystem: "Honda Sensing Camera",
    customer: "AutoNation Honda Westside",
    customerId: "CUST-005",
    technician: "D. Salinas",
    listPrice: 540.00,
    costPrice: 240.00,
  },
  {
    id: "ADAS-2024-03802",
    date: "2024-10-14",
    vehicle: "2023 Ford Escape",
    adasSystem: "Front Forward Camera",
    customer: "Prestige Collision Center",
    customerId: "CUST-001",
    technician: "R. Okafor",
    listPrice: 465.00,
    costPrice: 200.00,
  },
  {
    id: "ADAS-2024-03791",
    date: "2024-10-07",
    vehicle: "2024 Subaru Crosstrek",
    adasSystem: "EyeSight Forward Camera",
    customer: "Capital Subaru",
    customerId: "CUST-007",
    technician: "M. Thornton",
    listPrice: 610.00,
    costPrice: 270.00,
  },
  // ── September records ────────────────────────────────────────────────────────
  {
    id: "ADAS-2024-03774",
    date: "2024-09-25",
    vehicle: "2023 Kia Telluride",
    adasSystem: "Surround View / 360° Camera",
    customer: "Lakewood Auto Body",
    customerId: "CUST-004",
    technician: "R. Okafor",
    listPrice: 780.00,
    costPrice: 335.00,
  },
  {
    id: "ADAS-2024-03761",
    date: "2024-09-18",
    vehicle: "2022 Toyota Tacoma",
    adasSystem: "Pre-Collision System (PCS)",
    customer: "Sunrise Toyota",
    customerId: "CUST-003",
    technician: "M. Thornton",
    listPrice: 495.00,
    costPrice: 215.00,
  },
  {
    id: "ADAS-2024-03748",
    date: "2024-09-10",
    vehicle: "2023 BMW X3",
    adasSystem: "Lane Departure Camera",
    customer: "Prestige Collision Center",
    customerId: "CUST-001",
    technician: "D. Salinas",
    listPrice: 720.00,
    costPrice: 305.00,
  },
  {
    id: "ADAS-2024-03735",
    date: "2024-09-03",
    vehicle: "2022 Chevrolet Equinox",
    adasSystem: "Front Forward Camera",
    customer: "Summit Collision & Glass",
    customerId: "CUST-006",
    technician: "R. Okafor",
    listPrice: 465.00,
    costPrice: 200.00,
  },
];

// ─── Derived fields ────────────────────────────────────────────────────────────
// Attach profit and margin to every record so components don't recalculate.
export const profitRecordsWithCalcs = profitRecords.map((r) => ({
  ...r,
  profit: parseFloat((r.listPrice - r.costPrice).toFixed(2)),
  margin: parseFloat((((r.listPrice - r.costPrice) / r.listPrice) * 100).toFixed(1)),
}));

// ─── Summary stats ─────────────────────────────────────────────────────────────
export function getSummaryStats(records = profitRecordsWithCalcs) {
  const totalRevenue  = records.reduce((s, r) => s + r.listPrice, 0);
  const totalCost     = records.reduce((s, r) => s + r.costPrice, 0);
  const totalProfit   = records.reduce((s, r) => s + r.profit, 0);
  const avgMargin     = records.reduce((s, r) => s + r.margin, 0) / (records.length || 1);
  const bestJob       = [...records].sort((a, b) => b.profit - a.profit)[0] ?? null;

  return {
    totalRevenue:  parseFloat(totalRevenue.toFixed(2)),
    totalCost:     parseFloat(totalCost.toFixed(2)),
    totalProfit:   parseFloat(totalProfit.toFixed(2)),
    avgMargin:     parseFloat(avgMargin.toFixed(1)),
    jobCount:      records.length,
    bestJob,
  };
}

// ─── Monthly trend data ────────────────────────────────────────────────────────
export function getMonthlyTrend(records = profitRecordsWithCalcs) {
  const map = {};
  records.forEach((r) => {
    const key = r.date.slice(0, 7); // "YYYY-MM"
    if (!map[key]) map[key] = { month: key, revenue: 0, cost: 0, profit: 0, jobs: 0 };
    map[key].revenue += r.listPrice;
    map[key].cost    += r.costPrice;
    map[key].profit  += r.profit;
    map[key].jobs    += 1;
  });

  return Object.values(map)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((m) => ({
      ...m,
      revenue: parseFloat(m.revenue.toFixed(2)),
      cost:    parseFloat(m.cost.toFixed(2)),
      profit:  parseFloat(m.profit.toFixed(2)),
      label:   new Intl.DateTimeFormat("en-US", { month: "short", year: "2-digit" })
                 .format(new Date(m.month + "-01")),
    }));
}