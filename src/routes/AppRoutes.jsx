import { Routes, Route, Navigate } from "react-router-dom";
import DashboardShell from "../components/layout/DashboardShell";
import Dashboard from "../pages/Dashboard";
import PlaceholderPage from "../pages/PlaceholderPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardShell />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Sidebar routes */}
        <Route
          path="/documents"
          element={<PlaceholderPage title="Documents" />}
        />
        <Route
          path="/vehicles"
          element={<PlaceholderPage title="Vehicles" />}
        />
        <Route
          path="/customers"
          element={<PlaceholderPage title="Customers" />}
        />
        <Route
          path="/reports"
          element={<PlaceholderPage title="Reports" />}
        />
        <Route
          path="/uploads"
          element={<PlaceholderPage title="Uploads" />}
        />
        <Route
          path="/settings"
          element={<PlaceholderPage title="Settings" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}