import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import DashboardShell from "../components/layout/DashboardShell";
import RequireAuth from "../components/auth/RequireAuth";
import RequireRole from "../components/auth/RequireRole";
import { APP_ROLES } from "../services/msalConfig";

// Pages
const Login           = lazy(() => import("../pages/Login"));
const Unauthorized    = lazy(() => import("../pages/Unauthorized"));
const Dashboard       = lazy(() => import("../pages/Dashboard"));
const Documents       = lazy(() => import("../pages/Documents"));
const DocumentDetail  = lazy(() => import("../pages/DocumentDetail"));
const Reports         = lazy(() => import("../pages/Reports"));
const Uploads         = lazy(() => import("../pages/Uploads"));
const Customers       = lazy(() => import("../pages/Customers"));
const Vehicles        = lazy(() => import("../pages/Vehicles"));
const VehicleDetail   = lazy(() => import("../pages/VehicleDetail"));
const Settings        = lazy(() => import("../pages/Settings"));
const PlaceholderPage = lazy(() => import("../pages/PlaceholderPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Routes>
        {/* ── Public ──────────────────────────────────────────────────────── */}
        <Route path="/login"        element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ── Protected — require auth + MFA ──────────────────────────────── */}
        <Route element={<RequireAuth />}>
          <Route element={<DashboardShell />}>

            {/* All authenticated users */}
            <Route index                 element={<Dashboard />} />
            <Route path="/documents"     element={<Documents />} />
            <Route path="/documents/:id" element={<DocumentDetail />} />
            <Route path="/vehicles"      element={<Vehicles />} />
            <Route path="/vehicles/:vin" element={<VehicleDetail />} />
            <Route path="/customers"     element={<Customers />} />
            <Route path="/settings"      element={<Settings />} />
            <Route path="/placeholder"      element={<PlaceholderPage />} />

            {/* Admin-only */}
            <Route element={<RequireRole role={APP_ROLES.ADMIN} />}>
              <Route path="/reports" element={<Reports />} />
              <Route path="/uploads" element={<Uploads />} />
            </Route>

          </Route>
        </Route>

        {/* ── Catch-all ───────────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}