import { Routes, Route, Navigate } from "react-router-dom";
import DashboardShell from "../components/layout/DashboardShell";
import RequireAuth from "../components/auth/RequireAuth";
import RequireRole from "../components/auth/RequireRole";
import { APP_ROLES } from "../services/msalConfig";

// Pages
import Login          from "../pages/Login";
import Unauthorized   from "../pages/Unauthorized";
import Dashboard      from "../pages/Dashboard";
import Documents      from "../pages/Documents";
import DocumentDetail from "../pages/DocumentDetail";
import Reports        from "../pages/Reports";
import Uploads        from "../pages/Uploads";
import Customers      from "../pages/Customers";
import PlaceholderPage from "../pages/PlaceholderPage";

export default function AppRoutes() {
  return (
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
          <Route path="/vehicles"      element={<PlaceholderPage title="Vehicles"  />} />
          <Route path="/customers"     element={<Customers />} />
          <Route path="/settings"      element={<PlaceholderPage title="Settings"  />} />

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
  );
}