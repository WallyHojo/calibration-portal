import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// ─── RequireRole ───────────────────────────────────────────────────────────────
// Wrap admin-only routes with this to enforce role-based access.
// Users with the wrong role are redirected to /unauthorized.
//
// Usage in AppRoutes.jsx:
//   <Route element={<RequireRole role="CalibrationOS.Admin" />}>
//     <Route path="/admin/settings" element={<AdminSettings />} />
//   </Route>

export default function RequireRole({ role }) {
  const { role: userRole, initializing } = useAuth();

  if (initializing) return null;

  if (userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}