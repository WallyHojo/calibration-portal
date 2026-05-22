import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// ─── RequireAuth ───────────────────────────────────────────────────────────────
// Wrap any route with this to require authentication + MFA.
// Unauthenticated users are redirected to /login.
// The original destination is preserved in location state so the user
// is returned there after successful login.
//
// Usage in AppRoutes.jsx:
//   <Route element={<RequireAuth />}>
//     <Route path="/documents" element={<Documents />} />
//   </Route>

import { Outlet } from "react-router-dom";

export default function RequireAuth() {
  const { isAuthenticated, initializing } = useAuth();
  const location = useLocation();

  // Show nothing while MSAL initializes — avoids flash redirect
  if (initializing) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-500 text-sm">Verifying session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve the intended destination for post-login redirect
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}