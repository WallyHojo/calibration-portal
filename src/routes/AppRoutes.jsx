import { Routes, Route, Navigate } from "react-router-dom";
import DashboardShell from "../components/layout/DashboardShell";
import Dashboard from "../pages/Dashboard";
import Documents from "../pages/Documents";
import DocumentDetail from "../pages/DocumentDetail";
import Reports from "../pages/Reports";
import PlaceholderPage from "../pages/PlaceholderPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardShell />}>
        <Route index element={<Dashboard />} />

        <Route path="/documents"     element={<Documents />} />
        <Route path="/documents/:id" element={<DocumentDetail />} />

        <Route path="/reports"   element={<Reports />} />

        <Route path="/vehicles"  element={<PlaceholderPage title="Vehicles"  />} />
        <Route path="/customers" element={<PlaceholderPage title="Customers" />} />
        <Route path="/uploads"   element={<PlaceholderPage title="Uploads"   />} />
        <Route path="/settings"  element={<PlaceholderPage title="Settings"  />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}