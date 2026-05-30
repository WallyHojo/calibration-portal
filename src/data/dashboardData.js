// ─── Dashboard UI Data ────────────────────────────────────────────────────────
// Stat cards, navigation, quick actions, and activity feed for the
// ADAS calibration portal.

export const stats = [
  {
    id: "total_records",
    label: "Calibration Records",
    value: 3_847,
    delta: "+64 this month",
    trend: "up",
    color: "blue",
  },
  {
    id: "this_month",
    label: "Completed This Month",
    value: 64,
    delta: "+11 vs last month",
    trend: "up",
    color: "emerald",
  },
  {
    id: "vehicles",
    label: "Vehicles Serviced",
    value: 2_931,
    delta: "+48 this month",
    trend: "up",
    color: "slate",
  },
  {
    id: "customers",
    label: "Active Customers",
    value: 38,
    delta: "+2 onboarded",
    trend: "up",
    color: "violet",
  },
];

export const navItems = [
  { id: "dashboard", label: "Dashboard",  icon: "LayoutDashboard", path: "/"          },
  { id: "documents", label: "Documents",  icon: "FileText",        path: "/documents" },
  { id: "vehicles",  label: "Vehicles",   icon: "Car",             path: "/vehicles"  },
  { id: "customers", label: "Customers",  icon: "Users",           path: "/customers" },
  { id: "reports",   label: "Reports",    icon: "BarChart3",       path: "/reports"   },
  { id: "uploads",   label: "Uploads",    icon: "Upload",          path: "/uploads"   },
  { id: "settings",  label: "Settings",   icon: "Settings",        path: "/settings"  },
];

export const quickActions = [
  { id: "upload",   label: "Upload Record",      icon: "Upload",       path: "/uploads"   },
  { id: "vehicle",  label: "Add Vehicle",         icon: "Car",          path: "/vehicles"  },
  { id: "customer", label: "New Customer",         icon: "UserPlus",     path: "/customers" },
  { id: "report",   label: "Generate Report",      icon: "FileBarChart", path: "/reports"   },
];

export const activityFeed = [
  {
    id: 1,
    type: "upload",
    message: "Calibration record ADAS-2024-03847 uploaded",
    user: "M. Thornton",
    timestamp: "2024-11-15T14:32:00Z",
    detail: "2023 Honda CR-V — Front Forward Camera — Prestige Collision",
  },
  {
    id: 2,
    type: "upload",
    message: "Calibration record ADAS-2024-03846 uploaded",
    user: "D. Salinas",
    timestamp: "2024-11-15T11:18:00Z",
    detail: "2022 Ford F-150 — Front Radar (ACC) — Metro Collision & Auto",
  },
  {
    id: 3,
    type: "upload",
    message: "Calibration record ADAS-2024-03845 uploaded",
    user: "M. Thornton",
    timestamp: "2024-11-14T16:47:00Z",
    detail: "2024 Toyota Camry — 360° Surround View — Sunrise Auto Body",
  },
  {
    id: 4,
    type: "customer",
    message: "New customer onboarded: Lakewood Auto Body",
    user: "Admin",
    timestamp: "2024-11-14T09:15:00Z",
    detail: "Collision repair — 3 technicians registered",
  },
  {
    id: 5,
    type: "upload",
    message: "Calibration record ADAS-2024-03844 uploaded",
    user: "R. Okafor",
    timestamp: "2024-11-13T15:30:00Z",
    detail: "2023 Subaru Outback — EyeSight Forward Camera — Lakewood Auto Body",
  },
  {
    id: 6,
    type: "upload",
    message: "Calibration record ADAS-2024-03843 uploaded",
    user: "D. Salinas",
    timestamp: "2024-11-13T10:05:00Z",
    detail: "2022 BMW 3 Series — Lane Departure Camera — Prestige Collision",
  },
  {
    id: 7,
    type: "vehicle",
    message: "New vehicle added: 2024 Kia Sorento",
    user: "R. Okafor",
    timestamp: "2024-11-12T14:20:00Z",
    detail: "VIN: 5XYPG4A5XKG382910 — Lakewood Auto Body",
  },
];