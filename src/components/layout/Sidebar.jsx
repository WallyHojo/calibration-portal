import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Car,
  Users,
  BarChart3,
  Upload,
  Settings,
  Gauge,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { navItems } from "../../data/dashboardData";
import { useAuth } from "../../hooks/useAuth";

const iconMap = {
  LayoutDashboard,
  FileText,
  Car,
  Users,
  BarChart3,
  Upload,
  Settings,
};

// Nav items only admins can see
const ADMIN_ONLY_PATHS = ["/reports", "/uploads"];

function getInitials(name = "") {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function Sidebar() {
  const { account, isAdmin, logout } = useAuth();

  const displayName = account?.name ?? account?.username ?? "User";
  const initials    = getInitials(displayName);
  const roleLabel   = isAdmin ? "Admin" : "Customer";

  const visibleNavItems = navItems.filter(
    (item) => isAdmin || !ADMIN_ONLY_PATHS.includes(item.path)
  );

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-slate-900 border-r border-slate-800 fixed top-0 left-0 bottom-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600">
          <Gauge className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight tracking-wide">
            Calibright
          </p>
          <p className="text-slate-500 text-xs tracking-widest uppercase">
            Customer Portal
          </p>
        </div>
      </div>

      {/* Nav section label */}
      <div className="px-6 pt-6 pb-2">
        <p className="text-slate-500 text-xs font-medium tracking-widest uppercase">
          Navigation
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {visibleNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {Icon && (
                    <Icon
                      className={[
                        "w-4 h-4 shrink-0 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-slate-500 group-hover:text-slate-300",
                      ].join(" ")}
                    />
                  )}
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="border-t border-slate-800 px-4 py-4">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg group">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-white">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-200 text-sm font-medium leading-tight truncate">
              {displayName}
            </p>
            <p className="text-slate-500 text-xs truncate">{roleLabel}</p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-slate-600 hover:text-red-400 transition-colors shrink-0"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}