import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RequireRole({ role }) {
  const { role: userRole, initializing } = useAuth();
  if (initializing) return null;
  if (userRole !== role) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}