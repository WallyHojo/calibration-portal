import { Routes, Route, Navigate } from "react-router-dom";
import DashboardShell from "../components/layout/DashboardShell";
import Dashboard from "../pages/Dashboard";
import Documents from "../pages/Documents";
import DocumentDetail from "../pages/DocumentDetail";
import PlaceholderPage from "../pages/PlaceholderPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardShell />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Documents */}
        <Route path="/documents"     element={<Documents />} />
        <Route path="/documents/:id" element={<DocumentDetail />} />

        {/* Sidebar routes */}
        <Route path="/vehicles"  element={<PlaceholderPage title="Vehicles"  />} />
        <Route path="/customers" element={<PlaceholderPage title="Customers" />} />
        <Route path="/reports"   element={<PlaceholderPage title="Reports"   />} />
        <Route path="/uploads"   element={<PlaceholderPage title="Uploads"   />} />
        <Route path="/settings"  element={<PlaceholderPage title="Settings"  />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}